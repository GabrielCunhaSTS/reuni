const bcrypt =  require('bcrypt')
const { ModelUsuario } = require ('../models/ModelUsuario')
const { where, Model, Op } = require('sequelize')

module.exports = {
    logout(req, resp) {
        req.session.destroy(err => {
            if(err) {
                console.error('Erro ao destruir sessão:', err)
            } else {
                resp.redirect('/')
            }
        });
    }
}
