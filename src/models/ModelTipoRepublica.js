const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

const ModelTipoRepublica = conecBanco.define('tb_tipoRepublica',{
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
}, _padraoTableBDExistente('tb_tipoRepublica')
)

module.exports ={
    ModelTipoRepublica
}