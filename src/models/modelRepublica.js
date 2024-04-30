const { conecBanco } = require('../config/bdConec')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistente } = require('../config/configTabelasBD')
const { ModelDadosRepublica } =  require('../models/ModelDadosRepublicas')
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica')
const { ModelAlguel} = require('../models/ModelAluguel')
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica')

const ModelRepublica = conecBanco.define('tb_republica',{
    id_republica:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    id_dadoRepublica:{   //editar foreign key(quando descobrir)
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model:'tb_DadosRepublicas',
            key: 'id_dadoRepublica'
        }
    },
    id_localizacao:{   //editar foreign key(quando descobrir)
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model:'tb_localizacaoRepublica',
            key: 'id_localizacao'
        }
    },
    id_tipoRepublica:{   //editar foreign key(quando descobrir)
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model:'tb_tipoRepublica',
            key: 'id_tipoRepublica'
        }
    },
    id_regraRepublica:{   //editar foreign key(quando descobrir)
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model:'tb_regrasRepublica',
            key: 'id_regraRepublica'
        }
    },
    id_valorAlguel:{   //editar foreign key(quando descobrir)
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model:'tb_aluguel',
            key: 'id_valorAlguel'
        }
    },
    id_comodidade:{   //editar foreign key(quando descobrir)
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model:'tb_comodidades',
            key: 'id_comodidade'
        }
    },
    ds_nomeRepublica:{
        type:DataTypes.TEXT(50),
        allowNull:false
    },
    ds_descricaoRepublica:{
        type:DataTypes.TEXT(500),
        allowNull:false
    }
}, _padraoTableBDExistente('tb_republica')
)

ModelDadosRepublica.hasMany(ModelRepublica, {foreignKey: 'id_dadoRepublica'})
ModelRepublica.belongsTo(ModelDadosRepublica, {foreignKey: 'id_dadoRepublica'})

ModelTipoRepublica.hasMany(ModelRepublica, {foreignKey:'id_tipoRepublica'})
ModelRepublica.belongsTo(ModelTipoRepublica, {foreignKey:'id_tipoRepublica'})

ModelAlguel.hasMany(ModelRepublica, {foreignKey:'id_valorAlguel'})
ModelRepublica.belongsTo(ModelAlguel, {foreignKey:'id_valorAlguel'})

ModelLocalizacaoRepublica.hasMany(ModelRepublica, {foreignKey: 'id_localizacao'})
ModelRepublica.belongsTo(ModelLocalizacaoRepublica, {foreignKey:'id_localizacao'})


module.exports ={
    ModelRepublica
}