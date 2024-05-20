const { conecBanco } = require('../config/bdConec')
const { DataTypes } = require('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD');
const { ModelUsuario } = require('./ModelUsuario');
const { ModelRepublica } = require('./modelRepublica');

const ModelComentario = conecBanco.define('tb_comentarios',{
    id_comentario: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_usu:{
        type: DataTypes.INTEGER.UNSIGNED,
    },
    id_republica:{
        type: DataTypes.INTEGER.UNSIGNED,
    },
    ds_texto:{
        type: DataTypes.TEXT
    },
    data_criacao:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }

}, _padraoTableBDExistente('tb_comentarios'))


ModelComentario.belongsTo(ModelUsuario, { foreignKey: 'id_usu' });
ModelUsuario.hasMany(ModelComentario, { foreignKey: 'id_usu' });

ModelComentario.belongsTo(ModelRepublica, { foreignKey: 'id_republica' }); // Correto
ModelRepublica.hasMany(ModelComentario, { foreignKey: 'id_republica' }); // Correto


module.exports = {
    ModelComentario
}