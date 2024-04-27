const { conecSequelize } = require('../../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/configTabelasDB')

ModelAnfitriao = conecSequelize.define('tb_anfitriao',{
    id_anfitriao:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false

    },
    id_usu:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    },
    id_republica:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    }
}, _padraoTableBDExistence('tb_anfitriao'))

module.exports ={
    ModelAnfitriao
}