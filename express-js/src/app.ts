import express, { Request, Response } from "express";
const app = express();
app.use(express.json());

const useRouter = express.Router()
app.use("/api/user", useRouter)

useRouter.get("/create", (req: Request, res: Response)=>{
  res.json({success: true,
    message: "User is created successfully",
    data: "ai ne data"
  })
})

app.get("/", (req: Request, res: Response) => {
  res.send("Hello developer!");
});


app.all("*", (req:Request, res: Response)=>{
  res.status(404).json({
    message: "you failde you parents"
  })
})

export default app;
