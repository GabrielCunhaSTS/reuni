const { conecSequelize } = require('../../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/configTabelasDB')

ModelRepublica = conecSequelize.define('tb_republica',{
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
    id_comodidadeRepublica:{   //editar foreign key(quando descobrir)
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
}, _padraoTableBDExistence('tb_republica')
)

module.exports ={
    ModelRepublica
}