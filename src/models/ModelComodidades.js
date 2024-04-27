const { conecSequelize } = require('../../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/configTabelasDB')

ModelComodidades = conecSequelize.define('tb_comodiades',{
    id_comodidade:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false  
     },
    ds_wifi:{
        type:DataTypes.BOOLEAN,
    },
    ds_tv:{
        type:DataTypes.BOOLEAN,
    },
    ds_cozinha:{
        type:DataTypes.BOOLEAN,
    },
    ds_garagem:{
        type:DataTypes.BOOLEAN,
    },
    ds_arcondicionado:{
        type:DataTypes.BOOLEAN,
    } 
}, _padraoTableBDExistence('tb_comodidades')
)

module.exports ={
    ModelComodidades
}