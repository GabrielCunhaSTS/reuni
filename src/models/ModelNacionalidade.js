const { conecSequelize } = require('../../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/configTabelasDB')

ModelNacionalidade = conecSequelize.define('tb_nacionalidade',{
    id_nacionalidade:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    nm_nacionalidade:{
        type:DataTypes.TEXT,
        allowNull: false
    }
}, _padraoTableBDExistence('tb_nacionalidade')
)

module.exports ={
    ModelNacionalidade
}