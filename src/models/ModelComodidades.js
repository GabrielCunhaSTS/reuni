const { conecBanco } = require('../config/bdConec')
const { DataTypes } = require('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

const ModelComodidades = conecBanco.define('tb_comodiades', {
    id_comodidade: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    ds_wifi: {
        type: DataTypes.BOOLEAN,
    },
    ds_tv: {
        type: DataTypes.BOOLEAN,
    },
    ds_cozinha: {
        type: DataTypes.BOOLEAN,
    },
    ds_garagem: {
        type: DataTypes.BOOLEAN,
    },
    ds_arcondicionado: {
        type: DataTypes.BOOLEAN,
    }
}, _padraoTableBDExistente('tb_comodidades')
)

module.exports = {
    ModelComodidades
}