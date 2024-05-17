const { ModelImagem } = require('../models/ModelImage');
const { ModelUsuario } = require('../models/ModelUsuario');

module.exports = {
    uploadImage: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).send('Nenhum arquivo foi carregado.');
            }
    
            const newImage = await ModelImagem.create({
                nome_imagem: req.file.filename,
                nome_arquivo: req.file.path
            });

            const idUsuario = req.session.user.id_usu;
            
            await ModelUsuario.update(
                { id_imagem: newImage.id_imagem },
                { where: { id_usu: idUsuario } }
            );
    
            res.redirect('/perfil-Usuario');
        } catch (error) {
            console.error('Erro ao carregar a imagem:', error);
            res.status(500).send('Erro ao carregar a imagem.');
        }
    } 
}
