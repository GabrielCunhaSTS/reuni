const { DataTypes } = require('sequelize');
const { conecBanco } = require('../config/bdConec');

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
    }
});

module.exports = {
    ModelImagem
};
