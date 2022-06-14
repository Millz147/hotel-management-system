import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

//Main Route
import router from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

//Database Connection
mongoose.connect(process.env.DB);
mongoose.connection
  .on("error", (err) => {
    console.log("DB error: " + err);
  })
  .once("connected", () => {
    console.log("Database Connected!!!");
  });



app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(morgan("tiny"));

app.use("/", router);

app.listen(PORT);
