import express from "express";
import dotenv from "dotenv";
import { fileServer } from "./fileServer";
import fileUploader from "./fileUploader";
const app = express();

dotenv.config();

const { PORT } = process.env;

app.get("*", fileServer);

app.post("*", fileUploader);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
