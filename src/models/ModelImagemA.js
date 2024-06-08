const { DataTypes } = require('sequelize');
const { conecBanco } = require('../config/bdConec');
const { _padraoTableBDExistente } = require('../config/configTabelasBD');
const { ModelAnunciante } = require('./ModelAnunciante');


const ModelImagemA = conecBanco.define('tb_imagemA', {
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
    id_anunciante: {
        type: DataTypes.INTEGER
    }
}, _padraoTableBDExistente('tb_imagemA'));

ModelAnunciante.hasMany(ModelImagemA, { foreignKey: 'id_anunciante' })
ModelImagemA.belongsTo(ModelAnunciante, { foreignKey: 'id_anunciante' })

module.exports = {
    ModelImagemA
};
