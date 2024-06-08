const { ModelImagem } = require('../models/ModelImage');

module.exports = {
    uploadImage: async (req, res) => {
        try {
            console.log('Arquivo encontrado no corpo da Requisição:', req.file)

            if (!req.file) {
                return res.status(400).send('Você deve selecionar um arquivo! Não havia nenhum!')
            }

            const usuarioId = req.session.user.id_usu

            let imagemPerfil = await ModelImagem.findOne({ where: { id_usu: usuarioId } })

            if (imagemPerfil) {
                imagemPerfil.nome_arquivo = req.file.mimetype;
                imagemPerfil.nome_imagem = req.file.filename;
                await imagemPerfil.save();
            }
            else {
                imagemPerfil = await ModelImagem.create({
                    id_usu: usuarioId,
                    nome_arquivo: req.file.mimetype,
                    nome_imagem: req.file.filename
                });
            }

            console.log('Registro de imagem criado ou atualizado no banco de dados:', imagemPerfil)

            return res.redirect('/perfil-Usuario')
        } catch (erro) {
            console.error('Erro ao tentar fazer upload de imgs:', erro)
            return res.status(500).send(`Erro ao tentar fazer upload de imgs: ${erro}`)
        }
    },
    imgPerfil: async (req, res, next) => {
        if (req.session.user && req.session.user.id_usu) {
            try {
                const imagemPerfil = await ModelImagem.findOne({ where: { id_usu: req.session.user.id_usu } })

                const imgCerta = imagemPerfil.nome_imagem

                if (imagemPerfil) {
                    res.locals.fotoPerfilUrl = `/up/${imgCerta}`
                } else {
                    res.locals.fotoPerfilUrl = '/up/add.png'
                }
            } catch (error) {
                console.error('Erro ao carregar foto de perfil:', error)
                res.locals.fotoPerfilUrl = '/up/ImageDefault.jpg'
            }
        } else {
            res.locals.fotoPerfilUrl = '/up/ImageDefault.jpg'
        }
        next();
    },
    DeleteImage: async (req, res) => {
        const idUsuario = req.session.user.id_usu

        try {
            await ModelImagem.destroy({ where: { id_usu: idUsuario } })

            console.log('Imagem excluída com sucesso.')
            return res.redirect('/perfil-Usuario')
        } catch (error) {
            console.error('Erro ao excluir imagem:', error)
            return res.status(500).json({ error: 'Erro ao excluir imagem.' })
        }
    }
}

