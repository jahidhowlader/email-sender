import multer from "multer";

// Multer config
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (request, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

export const upload = multer({ storage });