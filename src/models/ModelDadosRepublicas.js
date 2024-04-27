const { conecSequelize } = require('../../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/configTabelasDB')

ModelDadosRepublica = conecSequelize.define('tb_DadosRepublicas',{
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
},_padraoTableBDExistence('tb_dadoRepublica')
)

module.exports ={
    ModelDadosRepublica
}