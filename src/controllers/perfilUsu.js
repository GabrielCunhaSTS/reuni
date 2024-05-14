const { ModelUsuario } = require('../models/ModelUsuario')
const { ModelEstado } = require('../models/ModelEstado')
const { Sequelize, Op, where } = require('sequelize');

module.exports = {
    getPerfil: async (req, res) => {
        try {
            const idPerfil = req.session.user.id_usu;
            console.log("ID do usuário:", idPerfil);
    
            const perfil = await ModelUsuario.findByPk(idPerfil, {
                attributes: [
                    'nm_usu',
                    'sx_sexoUsu',
                    'qt_idade',
                    'ds_cpfUsu',
                    'ds_emailUsu',
                    'ds_descricaoPerfil',
                    'id_estadoOrigem'
                ],
                include: {
                    model: ModelEstado,
                    attributes: ['nm_estadoOrigem']
                }
            });
            console.log("Perfil do usuário:", perfil); 
            res.render('perfilUsu', { perfil: perfil });
        } catch (error) {
            console.error("Erro ao obter perfil do usuário:", error);
            res.status(500).send('Erro interno do servidor');
        }
    },

    editPerfil: async (req, res) => {
        const { nome, email, descricao } = req.body;
        const idUsuario = req.session.user.id_usu;

        try {
            await ModelUsuario.update({ nm_usu: nome, ds_emailUsu: email, ds_descricaoPerfil: descricao}, { where: { id_usu: idUsuario } });
            
            res.redirect('/perfil');
        } catch (error) {
            console.error("Erro ao editar perfil:", error);
            res.status(500).send('Erro ao editar perfil');
        }
    },

    deletePerfil: async(req,res) =>{
        const idUsuario = req.session.user.id_usu

        try{

            await ModelUsuario.destroy({ where: { id_usu: idUsuario}})

            res.redirect('/')

        }catch(error){
            console.error("Erro ao editar perfil:", error);
            res.status(500).send('Erro ao editar perfil');
        }
    }

};