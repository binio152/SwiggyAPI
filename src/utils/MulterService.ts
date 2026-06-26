import multer from "multer";
import path from "path";
import fs from "fs";
import { AppError } from "./AppError";

const uploadPath = path.join(process.cwd(), "uploads");

// Create upload folder if not exists
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// Config destination and file name at disk
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadPath);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, `image-${uniqueSuffix}${ext}`);
  },
});

// Filter received img types
const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) return cb(null, true);

  return cb(new AppError("Only JPEG and PNG images are allowed"));
};

// Limit 5MB for file large
const limits = {
  fileSize: 5 * 1024 * 1024,
};

export const upload = multer({ storage, fileFilter, limits });
