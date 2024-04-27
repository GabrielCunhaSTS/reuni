const { conecSequelize } = require('../../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/configTabelasDB')

ModelAlguel = conecSequelize.define('tb_aluguel',{
    id_valorAlguel:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    ds_estadiaMin:{
        type:DataTypes.BOOLEAN,
    },
    vl_valorMensal:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    ds_contasInclusas:{
        type:DataTypes.BOOLEAN
    }
}, _padraoTableBDExistence('tb_aluguel')
)

module.exports ={
    ModelAlguel
}