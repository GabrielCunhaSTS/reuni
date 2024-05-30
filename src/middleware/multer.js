const multer = require('multer');
const path = require('path');
const fs = require('fs');

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Apenas arquivos de imagem são permitidos', false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathDestino = path.join(__dirname, "../uploads/");
        if (!fs.existsSync(pathDestino)) {
            fs.mkdirSync(pathDestino, { recursive: true });
        }
        cb(null, pathDestino);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_projImgTest_${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
