import multer from "multer";
import { createDirIfNotExists } from "./createDir";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();

const router = express.Router();

type File = Express.Multer.File;

const allowedExtensions = ["jpg", "jpeg", "png", "webp"];

const getExtension = (file?: File) => file?.mimetype.split("/")[1];

const hasAnAllowedExtension = (file?: File): file is File =>
  !!file && allowedExtensions.includes(getExtension(file) || "");

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = async (_req, file, cb) => {
  try {
    if (!hasAnAllowedExtension(file)) {
      return cb(null, false);
    }
    return cb(null, true);
  } catch (error) {
    return cb(null, false);
  }
};

router.use(multer({ storage, fileFilter }).single("file"));
router.use(async (req, res) => {
  const filePath = path.join(process.env.FILES_DIR!, req.path);

  if (!req.file) {
    createDirIfNotExists(filePath);
    return res.send("OK");
  } else {
    const chunks = filePath.split("/");
    const fileName = chunks.pop();
    const dir = chunks.join("/");
    createDirIfNotExists(dir);

    fs.writeFileSync(`${dir}/${fileName}`, req.file.buffer);

    return res.send("OK");
  }
});

export default router;
