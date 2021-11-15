import express from "express";
import dotenv from "dotenv";
import { fileServer } from "./fileServer";
import fileUploader from "./fileUploader";
import { fileDeleter } from "./fileDeleter";
const app = express();

dotenv.config();

const { PORT, FILES_DIR } = process.env;

if (!FILES_DIR) {
  throw new Error("FILES_DIR is not defined");
}

app.get("*", fileServer);

app.post("*", fileUploader);

app.delete("*", fileDeleter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
