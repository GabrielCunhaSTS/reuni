const multer = require('multer');
const path = require('path');

// Diretório de destino para salvar os uploads
const uploadDirectory = path.join(__dirname, '..', 'uploads');

// Configuração do multer para armazenar arquivos localmente
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory); // Usar o diretório de uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo único
    }
});

// Filtro para permitir apenas uploads de imagens
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos de imagem são permitidos'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
        