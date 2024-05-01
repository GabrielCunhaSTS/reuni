const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

const ModelNacionalidade = conecBanco.define('tb_nacionalidade',{
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
}, _padraoTableBDExistente('tb_nacionalidade')
)

module.exports ={
    ModelNacionalidade
}