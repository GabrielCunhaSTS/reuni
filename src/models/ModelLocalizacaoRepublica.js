const { conecSequelize } = require('../../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/configTabelasDB')

ModelLocalizacaoRepublica = conecSequelize.define('tb_localizacaoRepublica',{
    id_localizacao:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:true
    },
    ds_cep:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    ds_cidade:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    ds_rua:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    ds_bairro:{
        type:DataTypes.TEXT,
        allowNull:true,
    }
},_padraoTableBDExistence('tb_localizacaoRepublica')
)

module.exports ={
    ModelLocalizacaoRepublica
}
