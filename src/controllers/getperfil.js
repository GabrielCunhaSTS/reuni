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
  // Renderiza o template e passa os dados da república para o front-end
  res.render('editar-republica', { republica });
    
        const {
            ds_nomeAnfitriao, ds_emailAnfitriao, nmr_telefoneAnfitriao, an_anoCriacao,
            ds_cep, ds_cidade, ds_estado, ds_rua, ds_bairro, ds_numero,
            ValorMensal, estad_min, contas_inclu,
            ds_nomeRepublica, ds_descricaoRepublica,
            tipoRep, imovel, qtd_banheiro, qtd_quarto,
            fumar, pets, visitas, bebidas,
            wifi, tv, cozinha, estacionamento, ar_condicionado
        } = req.body;   

        console.log("Atualizando república com ID:", republicaId);

        // Verificar se republicaId está definido
        if (!republicaId) {
            throw new Error("ID da república não fornecido.");
        }

        // Atualizar dados do anfitrião
        const dadosAnfitriaoAtualizados = await ModelDadosRepublica.update(
            {
                ds_nomeAnfitriao: ds_nomeAnfitriao,
                ds_emailContato: ds_emailAnfitriao,
                nmr_telefoneContato: numeroInteiro,
                an_anoCriacao: an_anoCriacao
            },
            
        );

        // Log para verificar se dados foram atualizados
        console.log("Dados do anfitrião atualizados:", dadosAnfitriaoAtualizados);

        // Atualizar localização da república
        const localizacaoAtualizada = await ModelLocalizacaoRepublica.update(
            {
                ds_cep: ds_cep,
                ds_cidade: ds_cidade,
                ds_estado: ds_estado,
                ds_rua: ds_rua,
                ds_bairro: ds_bairro,
                ds_numero: ds_numero
            },
            
        );

        // Log para verificar se localização foi atualizada
        console.log("Localização atualizada:", localizacaoAtualizada);

        // Atualizar tipo de república
        const tipoAtualizado = await ModelTipoRepublica.update(
            {
                ds_tipoRepublica: tipoRep,
                ds_tipoImovel: imovel,
                qtd_quartoRepublica: qtd_quarto,
                qtd_banheiroRepublica: qtd_banheiro
            },
            
        );

        // Log para verificar se tipo foi atualizado
        console.log("Tipo de república atualizado:", tipoAtualizado);

        // Atualizar regras da república
        const regrasAtualizadas = await ModelRegrasRepublica.update(
            {
                ds_permissaoFumar: fumar,
                ds_permissaoPets: pets,
                ds_permissaoBebidasAlc: bebidas,
                ds_permissaoVisitas: visitas
            },
            
        );

        // Log para verificar se regras foram atualizadas
        console.log("Regras da república atualizadas:", regrasAtualizadas);

        // Atualizar comodidades
        const comodidadesAtualizadas = await ModelComodidades.update(
            {
                ds_wifi: wifi,
                ds_tv: tv,
                ds_cozinha: cozinha,
                ds_garagem: estacionamento,
                ds_arcondicionado: ar_condicionado
            },
            
        );

        // Log para verificar se comodidades foram atualizadas
        console.log("Comodidades atualizadas:", comodidadesAtualizadas);

        let valorFinal = 0;
        if (ValorMensal) {
            valorFinal = parseFloat(ValorMensal.replace('R$', '').replace(/\./g, '').replace(',', '.'));
        }

        // Atualizar valor do aluguel
        const aluguelAtualizado = await ModelAlguel.update(
            {
                vl_valorMensal: valorFinal,
                ds_estadiaMin: estad_min,
                ds_contasInclusas: contas_inclu
            },
            
        );

        // Log para verificar se aluguel foi atualizado
        console.log("Aluguel atualizado:", aluguelAtualizado);

        // Atualizar dados da república
        const republicaAtualizada = await ModelRepublica.update(
            {
                ds_nomeRepublica: ds_nomeRepublica,
                ds_descricaoRepublica: ds_descricaoRepublica
            }
        );

        // Log para verificar se dados da república foram atualizados
        console.log("Dados da república atualizados:", republicaAtualizada);

        req.flash("success_msg", `República ${ds_nomeRepublica} atualizada com sucesso!`);
        res.render('editar-republica');
    } catch (error) {
        console.error("Erro no servidor:", error);
        req.flash("error_msg", `Erro no servidor: ${error.message}`);
        return res.redirect('/editar-republica?{{i}}');
    }},
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
