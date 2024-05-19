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
        references: {
            model: 'tb_usuario',
            key: 'id_usu'
        }
    },
    id_republica:{
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: 'tb_republica',
            key: 'id_republica'
        }
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

ModelComentario.belongsTo(ModelUsuario, { foreignKey: 'id_republica' }); // Este deve ser ModelRepublica
ModelRepublica.hasMany(ModelComentario, { foreignKey: 'id_republica' }); // Este deve ser ModelComentario


module.exports = {
    ModelComentario
}