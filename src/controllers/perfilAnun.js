const { ModelAnunciante } = require('../models/ModelAnunciante')
const { Sequelize, Op, where } = require('sequelize');

module.exports = {
    getPerfilAnunciante: async (req, res) => {
        try {
            const idPerfil = req.session.user.id_anunciante
            console.log("ID do usuário:", idPerfil);
    
            const perfil = await ModelAnunciante.findByPk(idPerfil, {
                attributes: [
                    [Sequelize.literal('id_usu'), 'id'],
                    [Sequelize.literal('nm_anunciante'), 'nome'],
                    [Sequelize.literal('sg_sexoAnunci'), 'sexo'],
                    [Sequelize.literal('ds_emailAunci'), 'email'],
                    [Sequelize.literal('qt_idadeAnunci'), 'idade'],
                    [Sequelize.literal('ds_cpfAnunci'), 'cpf'],
                ], raw:true,
            });
            console.log("Perfil do usuário:", perfil); 
            res.render('perfilAnun', { perfil: perfil });
        } catch (error) {
            console.error("Erro ao obter perfil do usuário:", error);
            res.status(500).send('Erro interno do servidor');
        }
    },

    // editPerfil: async (req, res) => {
    //     const { nome, email, descricao } = req.body;
    //     const idUsuario = req.session.user.id_usu;

    //     try {
    //         await ModelUsuario.update({ nm_usu: nome, ds_emailUsu: email, ds_descricaoPerfil: descricao}, { where: { id_usu: idUsuario } });
            
    //         res.redirect('/perfil');
    //     } catch (error) {
    //         console.error("Erro ao editar perfil:", error);
    //         res.status(500).send('Erro ao editar perfil');
    //     }
    // },

    // deletePerfil: async(req,res) =>{
    //     const idUsuario = req.session.user.id_usu

    //     try{

    //         await ModelUsuario.destroy({ where: { id_usu: idUsuario}})

    //         res.redirect('/')

    //     }catch(error){
    //         console.error("Erro ao editar perfil:", error);
    //         res.status(500).send('Erro ao editar perfil');
    //     }
    // }

};