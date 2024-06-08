const { ModelRepublica } = require('../models/modelRepublica');
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica');
const { ModelAlguel } = require('../models/ModelAluguel');
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica');
const { Sequelize, Op } = require('sequelize');

module.exports = {
getAllRep: async(req, res) => {
    try {
        const { femininas, masculinas, mistas } = req.query
        const filtragem = {}
        const idAnunciante = req.session.user.id_anunciante

        if (femininas) {
            filtragem.ds_tipoRepublica = 'fem'
        }
        if (masculinas) {
            filtragem.ds_tipoRepublica = 'masc'
        }
        if (mistas) {
            filtragem.ds_tipoRepublica = 'mista'
        }

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
                    where: filtragem
                },
                {
                    model: ModelLocalizacaoRepublica,
                    attributes: [],
                    required: true
                }
            ]
        })
        res.render('pesquisaAnun',{ Mrepublicas: resultados })

            
    } catch (error) {
        console.error("Erro ao pesquisar repúblicas:", error)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
    }
}

