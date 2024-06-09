const { ModelRepublica } = require('../models/modelRepublica');
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica');
const { ModelAlguel } = require('../models/ModelAluguel');
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica');
const { Sequelize, Op } = require('sequelize');
const { ModelImagemRep } = require('../models/ModelImagemRep');

module.exports = {
getAllRep: async(req, res) => {
    try {
        const idAnunciante = req.session.user.id_anunciante

        const resultados = await ModelRepublica.findAll({
            attributes: [
                [Sequelize.col('tb_republica.id_republica'), 'id'],
                [Sequelize.literal('ds_nomeRepublica'), 'nome'],
                [Sequelize.literal('ds_tipoRepublica'), 'tipo'],
                [Sequelize.literal('vl_valorMensal'), 'aluguel'],
                [Sequelize.literal('ds_estado'), 'estado'],
                [Sequelize.literal('ds_cidade'), 'cidade'],
                [Sequelize.literal('qtd_banheiroRepublica'), 'banheiro'],
                [Sequelize.literal('qtd_quartoRepublica'), 'quarto'],
                [Sequelize.fn('MIN', Sequelize.col('nome_imagem')), 'nome_imagem'] // Seleciona a primeira imagem
            ],  
            where: { id_anunciante: idAnunciante },
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
                    required: true,
                },
                {
                    model: ModelLocalizacaoRepublica,
                    attributes: [],
                    required: true
                },
                {
                    model: ModelImagemRep,
                    attributes: [],
                    required: true
                }
            ],
            group: ['tb_republica.id_republica', 'ds_nomeRepublica', 'ds_tipoRepublica', 'vl_valorMensal', 'ds_estado', 'ds_cidade', 'qtd_banheiroRepublica', 'qtd_quartoRepublica']
        });
        res.render('pesquisaAnun',{ Mrepublicas: resultados })

            
    } catch (error) {
        console.error("Erro ao pesquisar repúblicas:", error)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
    }
}

