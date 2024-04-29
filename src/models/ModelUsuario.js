const { conecBanco } = require('../config/bdConec')
const { DataTypes } = require('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')



const ModelUsuario = conecBanco.define('tb_usuario', {
    id_usu: {
        type: DataTypes.INTEGER.UNSIGNED, 
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false 
    },
    nm_usu: {
        type: DataTypes.STRING(100) 
    },
    sx_sexoUsu: {
        type: DataTypes.CHAR(1),
    },
    qt_idade:{
        type:DataTypes.INTEGER
    },
    ds_cpfUsu: {
        type: DataTypes.STRING(14), 
    },
    ds_rgUsu: {
        type: DataTypes.STRING(12),
    },
    ds_emailUsu: {
        type: DataTypes.STRING(150), 
    },
    ds_senhaUSu: {
        type: DataTypes.STRING(100), 
    },
    ds_descricaoPerfil: {
        type: DataTypes.STRING(500),
    },
    id_estadoOrigem: { 
        type: DataTypes.INTEGER.UNSIGNED, 
    }
}, _padraoTableBDExistente('tb_usuario')) 

module.exports ={
    ModelUsuario
}