const { conecSequelize } = require('../../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/configTabelasDB')

ModelRegrasRepublica = conecSequelize.define('tb_regrasRepublica',{
    id_regraRepublica:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    ds_permissaoFumar:{
        type:DataTypes.BOOLEAN
    },
    ds_permissaoPets:{
        type:DataTypes.BOOLEAN
    },ds_permissaoBebidasAlc:{
        type:DataTypes.BOOLEAN
    },
    ds_permissaoVisitas:{
        type:DataTypes.BOOLEAN
    },
    id_novaRegra:{                          //editar foreign key(quando descobrir)
        type:DataTypes.INTEGER.UNSIGNED
    }
}, _padraoTableBDExistence('tb_regrasRepublica')
)

module.exports ={
    ModelRegrasRepublica
}