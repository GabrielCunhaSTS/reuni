const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

const ModelAnunciante = conecBanco.define('tb_anunciante',{
    id_anunciante:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    nm_anunciante:{
        type: DataTypes.STRING(100) 
    },
    sg_sexoAnunci:{
        type: DataTypes.CHAR(1),
    },
    ds_emailAunci:{
        type: DataTypes.STRING(150), 
    },
    ds_senhaAnunci:{
        type: DataTypes.STRING(100), 
    },
    ds_cpfAnunci:{
        type: DataTypes.STRING(14), 
    },
    qt_idadeAnunci:{
        type:DataTypes.INTEGER
    }
}, _padraoTableBDExistente('tb_anunciante'))

module.exports ={
    ModelAnunciante
}