const { conecBanco } = require('../config/bdConec')
const { DataTypes } = require('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')
const { ModelEstado } = require('../models/ModelEstado')
const { ModelImagem } = require('./ModelImage')

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
        references: {
            model: 'tb_estadoOrigem', 
            key: 'id_estadoOrigem'
        }
    },
    id_imagem: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: 'tb_imagem',
            key: 'id_imagem'
        }
    }
    
}, _padraoTableBDExistente('tb_usuario')) 

ModelImagem.hasMany(ModelUsuario, {foreignKey: 'id_imagem'})
ModelUsuario.belongsTo(ModelImagem, {foreignKey: 'id_imagem'})

ModelEstado.hasMany(ModelUsuario, {foreignKey: 'id_estadoOrigem'})
ModelUsuario.belongsTo(ModelEstado, {foreignKey: 'id_estadoOrigem'})

module.exports ={
    ModelUsuario
}   
