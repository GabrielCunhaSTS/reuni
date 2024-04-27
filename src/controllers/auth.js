const bcrypt =  require('bcrypt')
const { ModelUsuario } = require ('../models/ModelUsuario')
const { where, Model, Op } = require('sequelize')

module.exports = {
    logout: async (req, resp) => {
        resp.clearCookie('cookie_usuario')
        resp.status(200).json({ msg: 'Logout bem sucedido.' })
    }
}
