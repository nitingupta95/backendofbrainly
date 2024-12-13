"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Userinfo = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
exports.UserModel = mongoose_1.default.model("users", Userinfo);
const ContentInfo = new Schema({
    id: { type: Number, required: true },
    type: {
        type: String,
        enum: ["document", "tweet", "youtube", "link"], // Restrict values to these options
        required: true
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value);
            },
            message: "Invalid URL format"
        }
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        default: [],
    },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users' },
});
exports.ContentModel = mongoose_1.default.model("Content", ContentInfo);
