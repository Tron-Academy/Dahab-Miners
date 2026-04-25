// middleware/uploadCsv.js
import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimeTypes = ["text/csv", "application/vnd.ms-excel"];

export const uploadCsv = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB (adjust if needed)
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Only CSV files are allowed"), false);
    }
    cb(null, true);
  },
});
