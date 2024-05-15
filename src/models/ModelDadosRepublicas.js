const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')


const ModelDadosRepublica = conecBanco.define('tb_DadosRepublicas',{
    id_dadoRepublica:{
       type:DataTypes.INTEGER.UNSIGNED,
       autoIncrement:true,
       primaryKey:true,
       allowNull:false  
    },
    ds_emailContato:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    nmr_telefoneContato:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    an_anoCriacao:{
        type:DataTypes.CHAR,
        allowNull:false
    }
},_padraoTableBDExistente('tb_DadosRepublicas')
)

module.exports ={
    ModelDadosRepublica
}