const { ModelAnunciante } = require('../models/ModelAnunciante')
const { Sequelize, Op, where } = require('sequelize');

module.exports = {
    getPerfilAnunciante: async (req, res) => {
        try {
            const idAnunciante = req.session.user.id_anunciante

            const perfil = await ModelAnunciante.findByPk(idAnunciante, {
                attributes: [
                    [Sequelize.literal('id_anunciante'), 'id'],
                    [Sequelize.literal('nm_anunciante'), 'nome'],
                    [Sequelize.literal('sg_sexoAnunci'), 'sexo'],
                    [Sequelize.literal('ds_emailAunci'), 'email'],
                    [Sequelize.literal('qt_idadeAnunci'), 'idade'],
                    [Sequelize.literal('ds_cpfAnunci'), 'cpf'],
                ], raw:true,
            });
            console.log("Perfil do anunciante:", perfil)
            res.render('perfilAnun', { perfil: perfil })
        } catch (error) {
            console.error("Erro ao obter perfil do usuário:", error)
            res.status(500).send('Erro interno do servidor')
        }
    },

    editPerfil: async (req, res) => {
        const { nome, email } = req.body
        const idAnunciante = req.session.user.id_anunciante

        try {
            await ModelAnunciante.update({ nm_anunciante: nome, ds_emailAunci: email }, { where: { id_anunciante: idAnunciante } })

            res.redirect('/perfil-Anunciante')
        } catch (error) {
            console.error("Erro ao editar perfil:", error)
            res.status(500).send('Erro ao editar perfil')
        }
    },

    deletePerfil: async (req, res) => {
        const idAnunciante = req.session.user.id_anunciante

        try {

            await ModelAnunciante.destroy({ where: { id_anunciante: idAnunciante } })

            res.redirect('/')

        } catch (error) {
            console.error("Erro ao editar perfil:", error)
            res.status(500).send('Erro ao editar perfil')
        }
    }

};