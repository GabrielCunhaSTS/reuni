const bcrypt =  require('bcrypt')
const { ModelUsuario } = require ('../models/ModelUsuario')
const { where, Model, Op } = require('sequelize')

module.exports = {
    logout: async (req, resp) => {
        resp.clearCookie('token')
        return resp.redirect('/') 
    }
}
