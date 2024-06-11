const { ModelRepublica } = require('../models/modelRepublica')
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica')
const { ModelAlguel } = require('../models/ModelAluguel')
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica')
const { ModelDadosRepublica} = require('../models/ModelDadosRepublicas')
const { Sequelize, Op } = require('sequelize')
const {ModelImagemRep} =  require('../models/ModelImagemRep')

module.exports = {
    getRepByName: async (req, res) => {
        console.log("Rota de pesquisa acionada")
        
        try {
            const nm_digit = req.params.nm_digit
            console.log("Termo de pesquisa:", nm_digit)
    
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
                    },
                    {
                        model: ModelImagemRep,
                        attributes: [],
                        required: true
                    }
                ],
                group: ['tb_republica.id_republica', 'ds_nomeRepublica', 'ds_tipoRepublica', 'vl_valorMensal', 'ds_estado', 'ds_cidade', 'qtd_banheiroRepublica', 'qtd_quartoRepublica']
            })
    
            console.log("Resultados da pesquisa:", resultados)
    
            if (resultados && resultados.length > 0) {
                res.json(resultados);
            } else {
                console.log("Nenhum resultado encontrado.")
                res.status(404).json({ message: 'República não encontrada' })
            }
        } catch (error) {
            console.error("Erro ao pesquisar repúblicas:", error)
            res.status(500).json({ message: 'Erro interno do servidor' })
        }
    },
    getRepByEstado: async (req, res) => {
        console.log("Rota de pesquisa por estado acionada");
        
        try {
            const estado_digit = req.params.nm_digit;
            console.log("Estado digitado:", estado_digit);

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
                    ds_estado:{
                        [Op.like]: `${estado_digit}%`
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

            console.log("Resultados da pesquisa por estado:", resultados);

            if (resultados && resultados.length > 0) {
                res.json(resultados);
            } else {
                console.log("Nenhum resultado encontrado.");
                res.status(404).json({ message: 'República não encontrada' });
            }
        } catch (error) {
            console.error("Erro ao pesquisar repúblicas por estado:", error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    getAllRep: async (req, res) => {
        try {
            const { femininas, masculinas, mistas, estado, preco } = req.query;
            const filtragem = {};
            const whereClause = {};
            const filtrovalor = {}
    
            if (femininas) {
                filtragem.ds_tipoRepublica = 'fem';
            }
            if (masculinas) {
                filtragem.ds_tipoRepublica = 'masc';
            }
            if (mistas) {
                filtragem.ds_tipoRepublica = 'mista';
            }
            
            if (estado) {
                whereClause.ds_estado = estado;
            }        
            
            if (preco) {
                filtrovalor.vl_valorMensal = preco; 
            }
    
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
                raw: true,
                include: [
                    {
                        model: ModelAlguel,
                        attributes: [],
                        required: true,
                        where: filtrovalor
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
                        required: true,
                        where: whereClause
                    },
                    {
                        model: ModelImagemRep,
                        attributes: [],
                        required: true
                    }
                ],
                group: ['tb_republica.id_republica', 'ds_nomeRepublica', 'ds_tipoRepublica', 'vl_valorMensal', 'ds_estado', 'ds_cidade', 'qtd_banheiroRepublica', 'qtd_quartoRepublica']
            });

            res.render('pesquisa', { republicas: resultados });
    
        } catch (error) {
            console.error("Erro ao pesquisar repúblicas:", error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    getAllRepHome: async (req, res) => {
        try {

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
                ],
                raw: true,
                include: [
                    {
                        model: ModelAlguel,
                        attributes: [],
                        required: true,
                       
                    },
                    {
                        model: ModelTipoRepublica,
                        attributes: [],
                        required: true,
                        
                    },
                    {
                        model: ModelLocalizacaoRepublica,
                        attributes: [],
                        required: true,
                            
                    }
                ]
            });

            res.render('home', { republicas: resultados });
    
        } catch (error) {
            console.error("Erro ao pesquisar repúblicas:", error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}