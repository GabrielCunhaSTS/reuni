const { ModelUsuario } = require('../models/ModelUsuario');
const { ModelEstado } = require('../models/ModelEstado');
const { Sequelize } = require('sequelize');
const { ModelImagem } = require('../models/ModelImage');
const bcrypt =  require('bcrypt')

module.exports = {
    getPerfil: async (req, res) => {
        try {
            const idUsuario = req.session.user.id_usu
            console.log("ID do usuário:", idUsuario)

            const perfil = await ModelUsuario.findByPk(idUsuario, {
                attributes: [
                    [Sequelize.literal('id_usu'), 'id'],
                    [Sequelize.literal('nm_usu'), 'nome'],
                    [Sequelize.literal('sx_sexoUsu'), 'sexo'],
                    [Sequelize.literal('ds_emailUsu'), 'email'],
                    [Sequelize.literal('qt_idade'), 'idade'],
                    [Sequelize.literal('ds_cpfUsu'), 'cpf'],
                    [Sequelize.literal('ds_descricaoPerfil'), 'descricao'],
                    [Sequelize.literal('nm_estadoOrigem'), 'estado']
                ],
                include: {
                    model: ModelEstado,
                    attributes: [],
                    required: true
                }
            })

            console.log("Perfil do usuário:", perfil.get({ plain: true }))

            res.render('perfilUsu', { perfil: perfil.get({ plain: true }) })
        } catch (error) {
            console.error("Erro ao obter perfil do usuário:", error)
            res.status(500).send('Erro interno do servidor')
        }
    },

    editPerfil: async (req, res) => {
        const { nome, email, descricao, senha } = req.body
        const idUsuario = req.session.user.id_usu

        try {
            const updateData = { 
                nm_usu: nome, 
                ds_emailUsu: email, 
                ds_descricaoPerfil: descricao 
            };
    
            // Se a senha foi fornecida, criptografe-a e adicione ao objeto de atualização
            if (senha) {
                const salt = await bcrypt.genSalt(10);
                const hashedSenha = await bcrypt.hash(senha, salt);
                updateData.ds_senhaUSu = hashedSenha;
            }
    
            // Atualize o usuário no banco de dados
            await ModelUsuario.update(updateData, { where: { id_usu: idUsuario } });

            res.redirect('/perfil-Usuario')
        } catch (error) {
            console.error("Erro ao editar perfil:", error)
            res.status(500).send('Erro ao editar perfil')
        }
    },

    deletePerfil: async (req, res) => {
        const idUsuario = req.session.user.id_usu

        try {
            await ModelUsuario.destroy({ where: { id_usu: idUsuario } })

            res.redirect('/')
        } catch (error) {
            console.error("Erro ao excluir perfil:", error)
            res.status(500).send('Erro ao excluir perfil')
        }
    }
};
