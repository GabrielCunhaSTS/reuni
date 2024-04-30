const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

ModelNovasRegras = conecBanco.define('tb_novasRegras',{
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
},_padraoTableBDExistente('tb_novasRegras')
)

module.exports ={
    ModelNovasRegras
}