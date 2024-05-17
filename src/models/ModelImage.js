const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')

const ModelImagem = conecBanco.define('tb_imagem', {
    id_imagem: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_imagem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome_arquivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},_padraoTableBDExistente('tb_imagem')
)

module.exports = {
    ModelImagem
} 
