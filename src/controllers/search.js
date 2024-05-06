const { ModelRepublica } = require('../models/modelRepublica')
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica')
const { ModelAlguel } = require('../models/ModelAluguel')
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica')
const { Sequelize, Op } = require('sequelize')
const { ModelDadosRepublica } = require('../models/ModelDadosRepublicas')

module.exports = {
    getRepByName: async (req, res) =>{
        console.log("essa rota esta sendo usada");
        try{
            const nm_digit = req.params.nm_digit
            console.log("Termo de pesquisa:", nm_digit);

            const resultado = await ModelRepublica.findAll({
                attributes:[
                    [Sequelize.literal('ds_nomeRepublica'), 'Nome_da_Republica'],
                    [Sequelize.literal('qtd_banheiroRepublica'), 'banheiro'],
                    [Sequelize.literal('qtd_quartoRepublica'), 'quarto'],
                    [Sequelize.literal('id_republica'), 'id'],
                    [Sequelize.literal('ds_tipoRepublica'), 'Tipo'],
                    [Sequelize.literal('vl_valorMensal'), 'Aluguel_Mensal'],
                    [Sequelize.literal('ds_cidade'), 'Cidade'],
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


           if (resultado && resultado.length > 0) {
            res.json(resultado);
        } else {
            console.log("Nenhum resultado encontrado.");
            res.status(404).json({ message: 'República não encontrada' });
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
        }
    }