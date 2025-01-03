const { conecBanco } = require('../config/bdConec')
const { DataTypes } = require('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

const ModelLocalizacaoRepublica = conecBanco.define('tb_localizacaoRepublica', {
    id_localizacao: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    ds_cep: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ds_cidade: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ds_estado:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    ds_rua: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ds_bairro: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ds_numero: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, _padraoTableBDExistente('tb_localizacaoRepublica')
)

module.exports = {
    ModelLocalizacaoRepublica
}
