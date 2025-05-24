"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
// Ensure correct import with file extension
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
mongoose_1.default.connect("mongodb+srv://ng61315:NITINgupta92@cluster0.fantk.mongodb.net/SecondBrain").then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requiredBody = zod_1.z.object({
            name: zod_1.z.string().min(3, "Name must be at least 3 characters").max(20, "Name cannot exceed 20 characters"),
            email: zod_1.z.string().email("Invalid email format").min(6, "Email must be at least 6 characters"),
            password: zod_1.z
                .string()
                .min(8, "The password must be at least 8 characters long.")
                .max(32, "The password must not exceed 32 characters.")
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/, "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%&*-)."),
        });
        const parsedDataWithSuccess = requiredBody.safeParse(req.body);
        if (!parsedDataWithSuccess.success) {
            res.status(411).json({
                message: "Incorrect Format",
                errors: parsedDataWithSuccess.error.issues,
            });
            return;
        }
        const { name, email, password } = parsedDataWithSuccess.data;
        const existingUser = yield db_1.UserModel.findOne({ email });
        if (existingUser) {
            res.status(403).json({
                message: "User already exists with this email",
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        res.status(200).json({
            message: "Signed up successfully",
        });
    }
    catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}));
const JWT_SECRET = "s3cret";
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield db_1.UserModel.findOne({
            email: email,
        });
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (user && passwordMatch) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id.toString()
            }, JWT_SECRET);
            res.json({
                token
            });
        }
        else {
            res.status(403).json({
                message: "Incorrect creds"
            });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
function auth(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(401).json({
                message: "Token missing",
            });
            return;
        }
        const decodedData = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = decodedData.id;
        next();
    }
    catch (err) {
        res.status(403).json({
            message: "Invalid token",
        });
    }
}
app.use(auth);
app.post("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, type, link, title, tags, userId } = req.body;
        yield db_1.ContentModel.create({
            id: id,
            type: type,
            link: link,
            userId: req.userId,
            title: title,
            tags: tags
        });
        res.json({
            message: "Your content are added "
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
app.get("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract optional filters from query parameters
        const { id, type, title, tags } = req.query;
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({
                message: "Unauthorized: User ID is missing",
            });
            return;
        }
        const data = yield db_1.ContentModel.find({ userId: userId }).populate("userId");
        // Return the fetched data
        res.json({
            message: "Data fetched successfully",
            content: data, // Array of documents fetched from the database
        });
    }
    catch (err) {
        console.error("Error fetching content:", err.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
}));
app.delete("/api/v1/content/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const content = yield db_1.ContentModel.findOneAndDelete({ id: Number(id) });
        if (!content) {
            res.status(404).json({
                message: "Content not found for the given ID",
            });
            return;
        }
        res.status(200).json({
            message: `Content with ID ${id} has been deleted successfully.`,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
app.post("/api/v1/brain/share", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
