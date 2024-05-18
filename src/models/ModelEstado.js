const { conecBanco } = require('../config/bdConec')
const { DataTypes } = require('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

const ModelEstado = conecBanco.define('tb_estadoOrigem', {
    id_estadoOrigem: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nm_estadoOrigem: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, _padraoTableBDExistente('tb_estadoOrigem')
)

module.exports = {
    ModelEstado
}