import type { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import { createDirIfNotExists } from "./createDir";

export const fileServer: RequestHandler = (req, res) => {
  createDirIfNotExists(process.env.FILES_DIR!);
  const filePath = path.join(process.env.FILES_DIR!, req.path);
  try {
    const file = fs.readFileSync(filePath);
    res.contentType("image/jpeg");
    return res.end(file);
  } catch (error) {
    interface Dir {
      directories: string[];
      files: string[];
    }
    const dir: Dir = {
      directories: [],
      files: [],
    };
    try {
      fs.readdirSync(filePath, { withFileTypes: true }).forEach((file) => {
        file.isDirectory()
          ? dir.directories.push(file.name)
          : dir.files.push(file.name);
      });
    } catch (error) {
      return res.status(404).send("Not found");
    }
    return res.json(dir);
  }
};
