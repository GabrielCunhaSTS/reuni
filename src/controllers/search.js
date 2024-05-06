// controllers/search.js

const { ModelRepublica } = require('../models/modelRepublica');
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica');
const { ModelAlguel } = require('../models/ModelAluguel');
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica');
const { Sequelize, Op } = require('sequelize');

module.exports = {
    getRepByName: async (req, res) => {
        console.log("Rota de pesquisa acionada");
        
        try {
            const nm_digit = req.params.nm_digit;
            console.log("Termo de pesquisa:", nm_digit);
    
            const resultados = await ModelRepublica.findAll({
                attributes:[
                    [Sequelize.literal('id_republica'), 'id'],
                    [Sequelize.literal('ds_nomeRepublica'), 'nome'],
                    [Sequelize.literal('ds_tipoRepublica'), 'tipo'],
                    [Sequelize.literal('vl_valorMensal'), 'aluguel'],
                    [Sequelize.literal('ds_cidade'), 'cidade'],
                    [Sequelize.literal('qtd_banheiroRepublica'), 'banheiro'],
                    [Sequelize.literal('qtd_quartoRepublica'), 'quarto'],
                ],
                where: {
                    ds_nomeRepublica:{
                        [Op.like]: `${nm_digit}%`
                    }
                },
                raw: true,
                include: [
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
            });
    
            console.log("Resultados da pesquisa:", resultados);
    
            if (resultados && resultados.length > 0) {
                res.json(resultados);
            } else {
                console.log("Nenhum resultado encontrado.");
                res.status(404).json({ message: 'República não encontrada' });
            }
        } catch (error) {
            console.error("Erro ao pesquisar repúblicas:", error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    getAllRep: async(req, res) =>{
        try {
            const resultados = await ModelRepublica.findAll({
                attributes:[
                    [Sequelize.literal('id_republica'), 'id'],
                    [Sequelize.literal('ds_nomeRepublica'), 'nome'],
                    [Sequelize.literal('ds_tipoRepublica'), 'tipo'],
                    [Sequelize.literal('vl_valorMensal'), 'aluguel'],
                    [Sequelize.literal('ds_cidade'), 'cidade'],
                    [Sequelize.literal('qtd_banheiroRepublica'), 'banheiro'],
                    [Sequelize.literal('qtd_quartoRepublica'), 'quarto'],
                ],
                raw: true,
                include: [
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
            });
    
            res.render('pesquisa', { republicas: resultados });
        } catch (error) {
            console.error("Erro ao pesquisar repúblicas:", error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}