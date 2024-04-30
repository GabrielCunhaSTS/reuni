const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

ModelDadosRepublica = conecBanco.define('tb_DadosRepublicas',{
    id_dadoRepublica:{
       type:DataTypes.INTEGER.UNSIGNED,
       autoIncrement:true,
       primaryKey:true,
       allowNull:false  
    },
    ds_nomeAnfitriao:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    ds_emailAnfitriao:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    nmr_telefoneAnfitriao:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    an_anoCriacao:{
        type:DataTypes.CHAR,
        allowNull:false
    }
},_padraoTableBDExistente('tb_dadoRepublica')
)

module.exports ={
    ModelDadosRepublica
}