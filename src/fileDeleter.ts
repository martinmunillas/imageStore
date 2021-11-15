import type { RequestHandler } from "express";
import fs from "fs";
import path from "path";

export const fileDeleter: RequestHandler = (req, res) => {
  const filePath = path.join(process.env.FILES_DIR!, req.path);
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    try {
      fs.rmdirSync(filePath);
    } catch (error) {
      res.sendStatus(500);
    }
  }
  res.sendStatus(200);
};
