const { ModelAlguel } = require('../models/ModelAluguel');
const { ModelComentario } = require('../models/ModelCometario');
const { ModelDadosRepublica } = require('../models/ModelDadosRepublicas');
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica');
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica');
const { ModelUsuario } = require('../models/ModelUsuario');
const { ModelRepublica } = require('../models/modelRepublica');
const { Sequelize, Op } = require('sequelize')
const { ModelImagemRep } = require('../models/ModelImagemRep');
const { ModelComodidades } = require('../models/ModelComodidades')
const { ModelRegrasRepublica } = require('../models/ModelRegrasRepublica')
const dateFns  = require('date-fns')
const ptBR = require('../controllers/formataçãoData');

module.exports = {

    getPerfilRepublica: async (req, res) => {
    try {
        const republicaId = req.query.id;
        
        const republica = await ModelRepublica.findOne({
            where: { id_republica: republicaId },
            attributes: [
                [Sequelize.literal('id_republica'), 'id'],
                [Sequelize.literal('ds_nomeRepublica'), 'nome'],
                [Sequelize.literal('ds_descricaoRepublica'), 'descricao'],
                [Sequelize.literal('an_anoCriacao'), 'anoDeCriacao'],
                [Sequelize.literal('ds_tipoRepublica'), 'tipo'],
                [Sequelize.literal('vl_valorMensal'), 'aluguel'],
                [Sequelize.literal('ds_cidade'), 'cidade'],
                [Sequelize.literal('ds_bairro'), 'bairro'],
                [Sequelize.literal('qtd_banheiroRepublica'), 'banheiro'],
                [Sequelize.literal('qtd_quartoRepublica'), 'quarto'],
                [Sequelize.literal('nmr_telefoneContato'), 'numero'],
                [Sequelize.literal('ds_wifi'), 'wifi'],
                [Sequelize.literal('ds_tv'), 'tv'],
                [Sequelize.literal('ds_cozinha'), 'cozinha'],      
                [Sequelize.literal('ds_garagem'), 'garagem'],      
                [Sequelize.literal('ds_arcondicionado'), 'arcondicionado'],
                [Sequelize.literal('ds_permissaoFumar'), 'fumar'],
                [Sequelize.literal('ds_permissaoPets'), 'pets'],
                [Sequelize.literal('ds_permissaoBebidasAlc'), 'bebidas'],      
                [Sequelize.literal('ds_permissaoVisitas'), 'visitas'],      
            ],
            raw: true,
            include: [
                {
                    model: ModelAlguel,
                    attributes: [],
                    required: true
                },
                {
                    model: ModelDadosRepublica,
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
                    model: ModelRegrasRepublica,
                    attributes: [],
                    required: true
                },
                {
                    model: ModelComodidades,
                    attributes: [],
                    required: true
                }
            ]
        });

        if (!republica) {
            return res.status(404).send('República não encontrada');
        }

        const comentarios = await ModelComentario.findAll({           
            where: {id_republica: republicaId},
            attributes:[
                [Sequelize.literal('nm_usu'), 'nome'],
                [Sequelize.literal('ds_texto'), 'texto'],
                [Sequelize.literal('data_criacao'), 'data'],
            ],
            include: [
                {
                    model: ModelUsuario,
                    attributes: [],
                    required:true
                }
            ],
            raw: true
        });

        const imagemRep = await ModelImagemRep.findAll({
            where: {id_republica: republicaId },
            attributes:[
                [Sequelize.literal('nome_imagem'), 'nome_imagem'],
            ]
        })

        comentarios.forEach(comentario => {
            comentario.dataFormatada = dateFns.formatDistanceToNow(new Date(comentario.data), { locale: ptBR ,addSuffix: true });
        });

        res.render('perfilRep', { republica, imagemRep, comentarios: comentarios, comodidades: republica, regras: republica });
    } catch (error) {
        console.error('Erro ao carregar perfil da república:', error);
        res.status(500).send('Erro interno do servidor');
    }
},
getPerfilRepublicaAnun: async (req, res) => {
    try {
        const republicaId = req.query.id;
        
        const republica = await ModelRepublica.findOne({
            where: { id_republica: republicaId },
            attributes: [
                [Sequelize.literal('id_republica'), 'id'],
                [Sequelize.literal('ds_nomeRepublica'), 'nome'],
                [Sequelize.literal('ds_descricaoRepublica'), 'descricao'],
                [Sequelize.literal('an_anoCriacao'), 'anoDeCriacao'],
                [Sequelize.literal('ds_tipoRepublica'), 'tipo'],
                [Sequelize.literal('vl_valorMensal'), 'aluguel'],
                [Sequelize.literal('ds_cidade'), 'cidade'],
                [Sequelize.literal('ds_bairro'), 'bairro'],
                [Sequelize.literal('qtd_banheiroRepublica'), 'banheiro'],
                [Sequelize.literal('qtd_quartoRepublica'), 'quarto'],
                [Sequelize.literal('nmr_telefoneContato'), 'numero'],
                [Sequelize.literal('ds_wifi'), 'wifi'],
                [Sequelize.literal('ds_tv'), 'tv'],
                [Sequelize.literal('ds_cozinha'), 'cozinha'],      
                [Sequelize.literal('ds_garagem'), 'garagem'],      
                [Sequelize.literal('ds_arcondicionado'), 'arcondicionado'],
                [Sequelize.literal('ds_permissaoFumar'), 'fumar'],
                [Sequelize.literal('ds_permissaoPets'), 'pets'],
                [Sequelize.literal('ds_permissaoBebidasAlc'), 'bebidas'],      
                [Sequelize.literal('ds_permissaoVisitas'), 'visitas'],      
            ],
            raw: true,
            include: [
                {
                    model: ModelAlguel,
                    attributes: [],
                    required: true
                },
                {
                    model: ModelDadosRepublica,
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
                    model: ModelRegrasRepublica,
                    attributes: [],
                    required: true
                },
                {
                    model: ModelComodidades,
                    attributes: [],
                    required: true
                }
            ]
        });

        if (!republica) {
            return res.status(404).send('República não encontrada');
        }

        const comentarios = await ModelComentario.findAll({           
            where: {id_republica: republicaId},
            attributes:[
                [Sequelize.literal('nm_usu'), 'nome'],
                [Sequelize.literal('ds_texto'), 'texto'],
                [Sequelize.literal('data_criacao'), 'data'],
            ],
            include: [
                {
                    model: ModelUsuario,
                    attributes: [],
                    required:true
                }
            ],
            raw: true
        });

        const imagemRep = await ModelImagemRep.findAll({
            where: {id_republica: republicaId },
            attributes:[
                [Sequelize.literal('nome_imagem'), 'nome_imagem'],
            ]
        })

        comentarios.forEach(comentario => {
            comentario.dataFormatada = dateFns.formatDistanceToNow(new Date(comentario.data), { locale: ptBR ,addSuffix: true });
        });

        res.render('perfilRepAnun', { republica, imagemRep, comentarios: comentarios, comodidades: republica, regras: republica });
    } catch (error) {
        console.error('Erro ao carregar perfil da república:', error);
        res.status(500).send('Erro interno do servidor');
    }
},
getPerfilRepublicaHome: async (req, res) => {
    try {
        const republicaId = req.query.id;
        
        const republica = await ModelRepublica.findOne({
            where: { id_republica: republicaId },
            attributes: [
                [Sequelize.literal('id_republica'), 'id'],
                [Sequelize.literal('ds_nomeRepublica'), 'nome'],
                [Sequelize.literal('ds_descricaoRepublica'), 'descricao'],
                [Sequelize.literal('an_anoCriacao'), 'anoDeCriacao'],
                [Sequelize.literal('ds_tipoRepublica'), 'tipo'],
                [Sequelize.literal('vl_valorMensal'), 'aluguel'],
                [Sequelize.literal('ds_cidade'), 'cidade'],
                [Sequelize.literal('ds_bairro'), 'bairro'],
                [Sequelize.literal('qtd_banheiroRepublica'), 'banheiro'],
                [Sequelize.literal('qtd_quartoRepublica'), 'quarto'],
                [Sequelize.literal('nmr_telefoneContato'), 'numero'],
                [Sequelize.literal('ds_wifi'), 'wifi'],
                [Sequelize.literal('ds_tv'), 'tv'],
                [Sequelize.literal('ds_cozinha'), 'cozinha'],      
                [Sequelize.literal('ds_garagem'), 'garagem'],      
                [Sequelize.literal('ds_arcondicionado'), 'arcondicionado'],
                [Sequelize.literal('ds_permissaoFumar'), 'fumar'],
                [Sequelize.literal('ds_permissaoPets'), 'pets'],
                [Sequelize.literal('ds_permissaoBebidasAlc'), 'bebidas'],      
                [Sequelize.literal('ds_permissaoVisitas'), 'visitas'],      
            ],
            raw: true,
            include: [
                {
                    model: ModelAlguel,
                    attributes: [],
                    required: true
                },
                {
                    model: ModelDadosRepublica,
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
                    model: ModelRegrasRepublica,
                    attributes: [],
                    required: true
                },
                {
                    model: ModelComodidades,
                    attributes: [],
                    required: true
                }
            ]
        });

        if (!republica) {
            return res.status(404).send('República não encontrada');
        }

        const comentarios = await ModelComentario.findAll({           
            where: {id_republica: republicaId},
            attributes:[
                [Sequelize.literal('nm_usu'), 'nome'],
                [Sequelize.literal('ds_texto'), 'texto'],
                [Sequelize.literal('data_criacao'), 'data'],
            ],
            include: [
                {
                    model: ModelUsuario,
                    attributes: [],
                    required:true
                }
            ],
            raw: true
        });

        res.render('perfilRepHome', { republica, comodidades: republica, regras: republica });
    } catch (error) {
        console.error('Erro ao carregar perfil da república:', error);
        res.status(500).send('Erro interno do servidor');
    }
},

};
