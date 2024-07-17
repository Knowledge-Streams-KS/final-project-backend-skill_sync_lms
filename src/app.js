import "dotenv/config.js";
import express from "express";
import { connectDB } from "./DB/config.js";
import syncDB from "./DB/init.js";
import allRoutes from "./routes.js";
import cors from "cors";
const app = express();

app.use(express.json());

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["GET", "POST"],
};
app.use(cors(corsOptions));
connectDB();
syncDB().then(() => {
  console.log("DB Synced");
});
app.use(allRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
