const { Sequelize } = require ('sequelize')

const usu = 'root'
const senha = 'root'
const bd = 'db_ReUni'

const conecBanco = new Sequelize(
    `mysql://${usu}:${senha}@localhost:3306/${bd}`
)

module.exports = {
    bd,
    conecBanco
}