const { conecSequelize } = require('../../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/configTabelasDB')

ModelTipoRepublica = conecSequelize.define('tb_tipoRepublica',{
    id_tipoRepublica:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    ds_tipoRepublica:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    ds_tipoImovel:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    ds_tipoQuarto:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    qtd_quartoRepublica:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    qtd_banheiroRepublica:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    qtd_moradoresRepublica:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
}, _padraoTableBDExistence('tb_tipoRepublica')
)

module.exports ={
    ModelTipoRepublica
}