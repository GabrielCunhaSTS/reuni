const { ModelUsuario } = require ('../models/ModelUsuario')
const { where, Model, Op } = require('sequelize')

module.exports = {
    getUsuarioByName: async (req, res) => {
        try {
            const nm_digit = req.params.nm_digit
            const resultado = await ModelUsuario.findAll({
                where: {
                    nm_usu:{
                    [Op.like]: `${nm_digit}%`
                    }
                }
            });
            if (resultado) {
                res.json(resultado); // Enviar resultado como JSON
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
}