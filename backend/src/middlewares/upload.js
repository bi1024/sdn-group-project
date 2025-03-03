import multer from "multer";

const storage = multer.memoryStorage(); // or diskStorage if saving locally

const upload = multer({ storage });

export default upload;
