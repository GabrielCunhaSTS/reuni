const { ModelComentario } = require("../models/ModelCometario");
const { ModelUsuario } = require("../models/ModelUsuario");
const { ModelRepublica } = require("../models/modelRepublica");

module.exports = {
    adicionarComentario: async (req, res) => {
        try {
            const { id_republica, texto } = req.body;
            const id_usuario = req.session.user.id_usu

            await ModelComentario.create({
                id_republica: id_republica,
                id_usu: id_usuario,
                ds_texto:texto
            });

            res.redirect(`/perfil-Republica?id=${id_republica}`);
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
            res.status(500).send('Erro interno do servidor');
        }
    },
    listarComentarios: async (req, res) => {
        try {
            const id_republica = req.query.id
    
            // Buscar a república junto com os comentários associados
            const republica = await ModelRepublica.findByPk(id_republica, {
                include: [
                    {
                        model: ModelComentario,
                        include: {
                            model: ModelUsuario,
                            attributes: ['id_usu', 'nm_usu']
                        }
                    }
                ]
            });
    
            console.log('Republica:', republica); // Adicione este console.log para verificar se a república foi encontrada
    
            if (republica) {
                console.log('Comentários:', republica.comentarios); // Adicione este console.log para verificar se os comentários estão presentes
    
                // Renderizar a view e passar a república com os comentários para a view
                res.render('perfilRep', { republica });
            } else {
                res.status(404).send('República não encontrada.');
            }
        } catch (error) {
            console.error('Erro ao carregar perfil da república:', error);
            res.status(500).send('Erro interno do servidor');
        }
    }    
};