import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js"

config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());

await connectDB();

app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})