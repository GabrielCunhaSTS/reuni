const { conecSequelize } = require('../../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/configTabelasDB')

ModelNovasRegras = conecSequelize.define('tb_novasRegras',{
    id_novaRegra:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    ds_novaRegra:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},_padraoTableBDExistence('tb_novasRegras')
)

module.exports ={
    ModelNovasRegras
}