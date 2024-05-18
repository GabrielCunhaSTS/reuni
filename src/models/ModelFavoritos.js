const { conecBanco } = require('../config/bdConec')
const { DataTypes } = require('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')
const { ModelRepublica } = require('./modelRepublica')
const { ModelUsuario } = require('./ModelUsuario')

const ModelFavoritos = conecBanco.define('tb_favoritos',{
    id_favorito:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_usu:{
        type: DataTypes.INTEGER,
    },
    id_republica:{
        type: DataTypes.INTEGER,
    }
    }, _padraoTableBDExistente('tb_favoritos')
)

ModelUsuario.hasMany(ModelFavoritos, { foreignKey: 'id_usu' });
ModelFavoritos.belongsTo(ModelUsuario, { foreignKey: 'id_usu' });

ModelRepublica.hasMany(ModelFavoritos, { foreignKey: 'id_republica' });
ModelFavoritos.belongsTo(ModelRepublica, { foreignKey: 'id_republica' });


module.exports = {
    ModelFavoritos
}