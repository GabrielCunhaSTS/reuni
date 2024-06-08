const { ModelFavoritos } = require("../models/ModelFavoritos");
const { ModelRepublica } = require("../models/modelRepublica");
const { Sequelize } = require('sequelize');

module.exports = {
    addFavorito: async (req, res) => {
        try {
            const usuarioId = req.session.user.id_usu
            const { republica_id } = req.body
    
            if (!usuarioId) {
                return res.status(401).send('Usuário não logado.')
            }

            const favoritoExistente = await ModelFavoritos.findOne({
                where: {
                    id_usu: usuarioId,
                    id_republica: republica_id
                }
            });

            if (favoritoExistente) {
                req.flash("error_msg", `A República já esta na sua lista de favoritos`)
                return res.redirect('favoritos')
            }
    
            async function criarFav (){
                await ModelFavoritos.create({ id_usu: usuarioId, id_republica: republica_id })
            } 
            await criarFav()
            req.flash("success_msg", `republica favoritada com sucesso`)
            res.redirect('favoritos')

        } catch (error) {
            console.error('Erro ao adicionar favorito:', error)
            res.status(500).send('Erro interno do servidor')
        }
    },
    getFavoritosByUsuario: async (req, res) => {
        const usuarioId = req.session.user.id_usu
    
        try {
            const favoritos = await ModelFavoritos.findAll({
                attributes: [
                    'id_republica',
                    [Sequelize.literal('ds_nomeRepublica'), 'nome'],
                    [Sequelize.literal('ds_descricaoRepublica'), 'descricao'],
                ],  
                where: { id_usu: usuarioId },
                include: [{
                    model: ModelRepublica,
                    attributes: []
                },
            ] 
            })

            res.render('favoritos', { favoritos });

        } catch (error) {
            console.error("Erro ao buscar favoritos:", error)
            res.status(500).send('Erro interno do servidor')
        }
    }
};
