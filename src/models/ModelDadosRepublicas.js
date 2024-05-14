const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')
const { ModelAnunciante } =require('../models/ModelAnunciante')

const ModelDadosRepublica = conecBanco.define('tb_DadosRepublicas',{
    id_dadoRepublica:{
       type:DataTypes.INTEGER.UNSIGNED,
       autoIncrement:true,
       primaryKey:true,
       allowNull:false  
    },
    id_anunciante:{
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model:'tb_anunciante',
            key: 'id_anunciante'
        }
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

ModelAnunciante.hasMany(ModelDadosRepublica, {foreignKey: 'id_anunciante'})
ModelDadosRepublica.belongsTo(ModelAnunciante, {foreignKey: 'id_anunciante'})

module.exports ={
    ModelDadosRepublica
}