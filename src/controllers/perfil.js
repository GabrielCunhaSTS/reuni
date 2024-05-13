const { ModelUsuario } = require('../models/ModelUsuario')
const { ModelEstado } = require('../models/ModelEstado')
const { Sequelize, Op } = require('sequelize');

module.exports = {
    getPerfil: async (req, res) => {
        try {
            const idPerfil = req.session.user.id_usu;
            console.log("ID do usuário:", idPerfil);
    
            const perfil = await ModelUsuario.findByPk(idPerfil, {
                attributes: [
                    [Sequelize.literal('id_usu'), 'id'],
                    [Sequelize.literal('nm_usu'), 'nome'],
                    [Sequelize.literal('sx_sexoUsu'), 'sexo'],
                    [Sequelize.literal('ds_emailUsu'), 'email'],
                    [Sequelize.literal('qt_idade'), 'idade'],
                    [Sequelize.literal('ds_cpfUsu'), 'cpf'],
                    [Sequelize.literal('ds_descricaoPerfil'), 'descricao'],
                    [Sequelize.literal('nm_estadoOrigem'), 'estado']
                ], raw:true,
                include:
                    {
                        model: ModelEstado,
                        attributes: [],
                        required: true
                    }
            });
            console.log("Perfil do usuário:", perfil); 
            res.render('perfil', { perfil: perfil });
        } catch (error) {
            console.error("Erro ao obter perfil do usuário:", error);
            res.status(500).send('Erro interno do servidor');
        }
    },

    editPerfil: async (req, res) => {
        const { nome, email, descricao } = req.body;
        const idUsuario = req.session.user.id_usu;

        try {
            await ModelUsuario.update({ nm_usu: nome, ds_emailUsu: email, ds_descricaoPerfil: descricao }, { where: { id_usu: idUsuario } });
            
            res.redirect('/perfil');
        } catch (error) {
            console.error("Erro ao editar perfil:", error);
            res.status(500).send('Erro ao editar perfil');
        }
    },

    deletePerfil: async(req,res) =>{

    }

};