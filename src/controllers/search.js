const { ModelRepublica } = require('../models/modelRepublica')
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica')
const { ModelAlguel } = require('../models/ModelAluguel')
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica')
const { Sequelize, Op } = require('sequelize')
const { ModelDadosRepublica } = require('../models/ModelDadosRepublicas')

module.exports = {
    getRepByName: async (req, res) =>{
        try{
            const nm_digit = req.params.nm_digit
            console.log("Termo de pesquisa:", nm_digit);

            const resultado = await ModelRepublica.findAll({
                attributes:[
                    [Sequelize.literal('ds_nomeRepublica'), 'Nome_da_Republica'],
                    [Sequelize.literal('ds_descricaoRepublica'), 'Descricao'],
                    [Sequelize.literal('ds_tipoRepublica'), 'Tipo'],
                    [Sequelize.literal('vl_valorMensal'), 'Aluguel_Mensal'],
                    [Sequelize.literal('ds_cidade'), 'Cidade'],
                    [Sequelize.literal('ds_bairro'), 'Bairro'] 
                ],
                where: {
                    ds_nomeRepublica:{
                        [Op.like]: `${nm_digit}%`
                    }
                }, raw:true,
                include:[
                    {
                        model: ModelAlguel,
                        attributes: [],
                        required: true
                    },
                    {
                        model: ModelTipoRepublica,
                        attributes: [],
                        required: true
                    },
                    {
                        model: ModelLocalizacaoRepublica,
                        attributes: [],
                        required: true
                    }
                ]
            })
            console.log("Resultados da pesquisa:", resultado); 

           if (resultado && resultado.length > 0) {
            res.json(resultado);
        } else {
            console.log("Nenhum resultado encontrado.");
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
        }
    }