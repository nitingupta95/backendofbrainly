import express, { Request, Response,NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserModel, ContentModel } from "./db";
 // Ensure correct import with file extension
import { z } from "zod";
import jwt from "jsonwebtoken"; 
import cors from "cors"; 
declare global {
    namespace Express {
      interface Request {
        userId?: string; // or number if you prefer
      }
    }
  }
 
mongoose.connect("mongodb+srv://ng61315:NITINgupta92@cluster0.fantk.mongodb.net/SecondBrain").then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req: Request, res: Response):Promise<void>=>{
    try {
         
        const requiredBody = z.object({
            name: z.string().min(3, "Name must be at least 3 characters").max(20, "Name cannot exceed 20 characters"),
            email: z.string().email("Invalid email format").min(6, "Email must be at least 6 characters"),
            password: z
                .string()
                .min(8, "The password must be at least 8 characters long.")
                .max(32, "The password must not exceed 32 characters.")
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
                    "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%&*-)."
                ),
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
 
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(403).json({
                message: "User already exists with this email",
            });
            return;
        }
 
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        res.status(200).json({
            message: "Signed up successfully",
        });
    } catch (error:any) {
        console.error("Server error:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});



const JWT_SECRET = "s3cret";

app.post("/api/v1/signin",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await UserModel.findOne({
            email: email,
        }) as  any;
        const passwordMatch =await  bcrypt.compare(password, user.password);
        if (user && passwordMatch) {
            const token = jwt.sign({
                id: user._id.toString()
            }, JWT_SECRET);

            res.json({
                token
            })
        }else {
            res.status(403).json({
                message: "Incorrect creds"
            })
        }
    }catch(err){
        res.status(500).json(err);
    }
    

});


function auth(req:Request, res:Response, next:NextFunction) :void{
    try {
        const token = req.headers.token as string | undefined;
        if (!token) {
            res.status(401).json({
                message: "Token missing",
            });
            return 
        }

        const decodedData = jwt.verify(token, JWT_SECRET) as { id: string };
        req.userId = decodedData.id;
        next();
    } catch (err) {
        res.status(403).json({
            message: "Invalid token",
        });
    }
}

app.use(auth);


app.post("/api/v1/content",async (req,res)=>{
    try{
        const {id,type,link,title,tags,userId}= req.body;
        await ContentModel.create({  
            id:id,
            type: type,
            link:link,
            userId:req.userId,
            title:title,
            tags:tags
        });
        res.json({
            message: "Your content are added "
        });


    }catch(err){
        res.status(500).json(err);
    } 
})


app.get("/api/v1/content", async (req:Request, res:Response): Promise<void> => {
    try {
        // Extract optional filters from query parameters
        const { id, type, title, tags } = req.query;
        const userId= req.userId;
        if (!userId) {
            res.status(401).json({
                message: "Unauthorized: User ID is missing",
            });
            return 
        }
        const data = await ContentModel.find({userId:userId}).populate("userId");

        // Return the fetched data
        res.json({
            message: "Data fetched successfully",
            content: data, // Array of documents fetched from the database
        });
    } catch (err:any) {
        console.error("Error fetching content:", err.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
});



app.delete("/api/v1/content/:id" ,async (req: Request, res: Response):Promise<void>=>{
    try{
        const { id } = req.params;
        const content = await ContentModel.findOneAndDelete({ id: Number(id) });
        if (!content) {
            res.status(404).json({
                message: "Content not found for the given ID",
            });
            return 
        }
        res.status(200).json({
            message: `Content with ID ${id} has been deleted successfully.`,
        });

    }catch(err){
        res.status(500).json(err);
    }
})


app.post("/api/v1/brain/share",async (req,res)=>{
    
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
