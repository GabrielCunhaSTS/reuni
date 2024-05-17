const { DataTypes } = require('sequelize');
const { conecBanco } = require('../config/bdConec');
const { _padraoTableBDExistente } = require('../config/configTabelasBD');
const { ModelUsuario } = require('./ModelUsuario');

const ModelImagem = conecBanco.define('tb_imagem', {
    id_imagem: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_imagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome_arquivo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_usu:{
        type:DataTypes.INTEGER
    }
}, _padraoTableBDExistente('tb_imagem'));

ModelUsuario.hasMany(ModelImagem, {foreignKey: 'id_usu'})
ModelImagem.belongsTo(ModelUsuario, {foreignKey: 'id_usu'})

module.exports = {
    ModelImagem
};
