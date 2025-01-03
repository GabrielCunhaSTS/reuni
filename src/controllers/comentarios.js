    const { ModelComentario } = require("../models/ModelCometario");

    module.exports = {
        adicionarComentario: async (req, res) => {
            try {
                
                const { texto } = req.body;
                const id_usuario = req.session.user.id_usu
                const id_republica = req.body.id_republica || req.query.id_republica

                await ModelComentario.create({
                    id_republica: id_republica,
                    id_usu: id_usuario,
                    ds_texto:texto
                });

                console.log(texto)
                res.redirect(`/perfil-Republica?id=${id_republica}`)
            } catch (error) {
                console.error('Erro ao adicionar comentário:', error)
                res.status(500).send('Erro interno do servidor')
            }
        }
    }