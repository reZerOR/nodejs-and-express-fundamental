"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const useRouter = express_1.default.Router();
app.use("/api/user", useRouter);
useRouter.get("/create", (req, res) => {
    res.json({ success: true,
        message: "User is created successfully",
        data: "ai ne data"
    });
});
app.get("/", (req, res) => {
    res.send("Hello developer!");
});
app.all("*", (req, res) => {
    res.status(404).json({
        message: "you failde you parents"
    });
});
exports.default = app;
