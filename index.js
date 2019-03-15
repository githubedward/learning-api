import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

// require auth router
import authRoutes from "./server/routes/auth.routes";
// instantiate express application
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(
    `Hey human, CORS-enabled server is now running at port ${port} 😏`
  );
});
