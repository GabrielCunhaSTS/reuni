const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

const ModelAnfitriao = conecBanco.define('tb_anfitriao',{
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
}, _padraoTableBDExistente('tb_anfitriao'))

module.exports ={
    ModelAnfitriao
}