import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";

import router from "./router/route.js";
//import connect from "./database/db.js";
let MONGO_URL = "mongodb://localhost:27017/AUTH";
mongoose.set("strictQuery", true);

let app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = 8080;

app.get("/", (req, res) => {
  res.status(201).json({ name: "Get Started" });
});

app.use("/api", router);

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening in ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
