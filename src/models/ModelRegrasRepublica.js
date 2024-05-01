const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

const ModelRegrasRepublica = conecBanco.define('tb_regrasRepublica',{
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
}, _padraoTableBDExistente('tb_regrasRepublica')
)

module.exports ={
    ModelRegrasRepublica
}