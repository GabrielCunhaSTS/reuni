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

updatePerfilRepublica: async (req, res) => {
    try {
        const republicaId = req.params.id;
        const {
            ds_nomeAnfitriao, ds_emailAnfitriao, nmr_telefoneAnfitriao, an_anoCriacao,
            ds_cep, ds_cidade, ds_estado, ds_rua, ds_bairro, ds_numero,
            ValorMensal, estad_min, contas_inclu,
            ds_nomeRepublica, ds_descricaoRepublica,
            tipoRep, imovel, qtd_banheiro, qtd_quarto,
            fumar, pets, visitas, bebidas,
            wifi, tv, cozinha, estacionamento, ar_condicionado
        } = req.body;

        let numeroInteiro = parseInt(nmr_telefoneAnfitriao.replace(/\D/g, ''), 10);

        // Atualizar dados do anfitrião
        await ModelDadosRepublica.update(
            {
                ds_nomeAnfitriao: ds_nomeAnfitriao,
                ds_emailContato: ds_emailAnfitriao,
                nmr_telefoneContato: numeroInteiro,
                an_anoCriacao: an_anoCriacao
            },
            { where: { id_republica: republicaId } }
        );

        // Atualizar localização da república
        await ModelLocalizacaoRepublica.update(
            {
                ds_cep: ds_cep,
                ds_cidade: ds_cidade,
                ds_estado: ds_estado,
                ds_rua: ds_rua,
                ds_bairro: ds_bairro,
                ds_numero: ds_numero
            },
            { where: { id_republica: republicaId } }
        );

        // Atualizar tipo de república
        await ModelTipoRepublica.update(
            {
                ds_tipoRepublica: tipoRep,
                ds_tipoImovel: imovel,
                qtd_quartoRepublica: qtd_quarto,
                qtd_banheiroRepublica: qtd_banheiro
            },
            { where: { id_republica: republicaId } }
        );

        // Atualizar regras da república
        await ModelRegrasRepublica.update(
            {
                ds_permissaoFumar: fumar,
                ds_permissaoPets: pets,
                ds_permissaoBebidasAlc: bebidas,
                ds_permissaoVisitas: visitas
            },
            { where: { id_republica: republicaId } }
        );

        // Atualizar comodidades
        await ModelComodidades.update(
            {
                ds_wifi: wifi,
                ds_tv: tv,
                ds_cozinha: cozinha,
                ds_garagem: estacionamento,
                ds_arcondicionado: ar_condicionado
            },
            { where: { id_republica: republicaId } }
        );

        let valorFinal = 0;
        if (ValorMensal) {
            valorFinal = parseFloat(ValorMensal.replace('R$', '').replace(/\./g, '').replace(',', '.'));
        }

        // Atualizar valor do aluguel
        await ModelAlguel.update(
            {
                vl_valorMensal: valorFinal,
                ds_estadiaMin: estad_min,
                ds_contasInclusas: contas_inclu
            },
            { where: { id_republica: republicaId } }
        );

        // Atualizar dados da república
        await ModelRepublica.update(
            {
                ds_nomeRepublica: ds_nomeRepublica,
                ds_descricaoRepublica: ds_descricaoRepublica
            },
            { where: { id_republica: republicaId } }
        );

        // Atualizar imagens da república
        const imagens = req.files;
        if (imagens && imagens.length > 0) {
            // Remover imagens antigas associadas à república
            await ModelImagemRep.destroy({ where: { id_republica: republicaId } });

            // Adicionar novas imagens
            for (const imagem of imagens) {
                await ModelImagemRep.create({
                    id_republica: republicaId,
                    nome_arquivo: imagem.mimetype,
                    nome_imagem: imagem.filename
                });
            }
        }

        req.flash("success_msg", `República ${ds_nomeRepublica} atualizada com sucesso!`);
        return res.redirect('/pesquisaAnun');
    } catch (error) {
        console.error("Erro no servidor:", error);
        req.flash("error_msg", `Erro no servidor: ${error.message}`);
        return res.redirect('/anunciar');
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
