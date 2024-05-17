const { ModelImagem } = require('../models/ModelImage');

module.exports = {
    uploadImage: async (req, res) => {
        try {
            // Verifica se o arquivo foi carregado
            if (!req.file) {
                return res.status(400).send('Nenhum arquivo foi carregado.');
            }
    
            // Salva as informações da imagem no banco de dados
            const newImage = await ModelImagem.create({
                nome_imagem: req.file.filename,
                nome_arquivo: req.file.path
            });
    
            res.redirect('/perfil-Usuario');
        } catch (error) {
            console.error('Erro ao carregar a imagem:', error);
            res.status(500).send('Erro ao carregar a imagem.');
        }
    } 
}
