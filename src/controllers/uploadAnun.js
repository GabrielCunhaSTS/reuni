const { ModelImagemA } = require('../models/ModelImagemA');

module.exports = {
    uploadImageA: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).send('Você deve selecionar um arquivo! Não havia nenhum!')
            }

            const id_anunciante = req.session.user.id_anunciante

            let imagemPerfil = await ModelImagemA.findOne({ where: { id_anunciante: id_anunciante } })

            if (imagemPerfil) {
                imagemPerfil.nome_arquivo = req.file.mimetype;
                imagemPerfil.nome_imagem = req.file.filename;
                await imagemPerfil.save();
            }
            else {
                imagemPerfil = await ModelImagemA.create({
                    id_anunciante: id_anunciante,
                    nome_arquivo: req.file.mimetype,
                    nome_imagem: req.file.filename
                });
            }

            return res.redirect('/perfil-Anunciante')
        } catch (erro) {
            console.error('Erro ao tentar fazer upload de imgs:', erro)
            return res.status(500).send(`Erro ao tentar fazer upload de imgs: ${erro}`)
        }
    },
    imgPerfilA: async (req, res, next) => {
        if (req.session.user && req.session.user.id_anunciante) {
            try {
                const imagemPerfil = await ModelImagemA.findOne({ where: { id_anunciante: req.session.user.id_anunciante } })

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
    DeleteImageA: async (req, res) => {
        const id_anunciante = req.session.user.id_anunciante

        try {
            await ModelImagemA.destroy({ where: { id_anunciante: id_anunciante } })

            console.log('Imagem excluída com sucesso.')
            return res.redirect('/perfil-Anunciante')
        } catch (error) {
            console.error('Erro ao excluir imagem:', error)
            return res.status(500).json({ error: 'Erro ao excluir imagem.' })
        }
    }
}

