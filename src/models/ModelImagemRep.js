const { conecBanco } = require('../config/bdConec')
const { DataTypes } = require('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')
const { ModelRepublica } = require('./modelRepublica')


const ModelImagemRep =  conecBanco.define('tb_imagemRepublica', {
    id_imagem:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_republica:{
        type: DataTypes.INTEGER
    },
    nome_imagem:{
        type: DataTypes.STRING,
        allowNull: false
    },
	nome_arquivo:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, _padraoTableBDExistente('tb_imagemRepublica'))

ModelRepublica.hasMany(ModelImagemRep, { foreignKey: 'id_republica' })
ModelImagemRep.belongsTo(ModelRepublica, { foreignKey: 'id_republica' })

module.exports = {
    ModelImagemRep
}