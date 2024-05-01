const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

const ModelAlguel = conecBanco.define('tb_aluguel',{
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
}, _padraoTableBDExistente('tb_aluguel')
)

module.exports ={
    ModelAlguel
}