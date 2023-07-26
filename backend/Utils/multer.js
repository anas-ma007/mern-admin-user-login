const multer = require('multer');
const path = require('path');

// Multer Config

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        console.log("this is file name :", ext)
        if(ext !== ".jpg" && ext != ".jpeg" && ext != ".png") {
            cb(new Error("File type is not supported"),false);
            return;
        }
        cb(null,true);
    }  
});