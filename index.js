import express from "express";
import { dbConnect } from "./config/dbConnect.js";
import dotenv from "dotenv";
import router from "./routes/userRoute.js";

dotenv.config();
dbConnect();
const app = express();

app.use (express.json());

const PORT = process.env.Port || 3000;
app.use('/api/v1/users', router);

app.listen(PORT, ()=> console.log(`server running at ${PORT}`));