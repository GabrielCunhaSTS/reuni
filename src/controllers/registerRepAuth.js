const { ModelRepublica } = require('../models/modelRepublica');
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica');
const { ModelAlguel } = require('../models/ModelAluguel');
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica');
const { ModelDadosRepublica } = require('../models/ModelDadosRepublicas')
const { ModelRegrasRepublica } = require('../models/ModelRegrasRepublica')
const { ModelComodidades } = require('../models/ModelComodidades')
const { Sequelize, Op } = require('sequelize');

module.exports = {
    registerRepublica: async (req, resp) => {
        try {
            const {
                ds_nomeAnfitriao, ds_emailAnfitriao, nmr_telefoneAnfitriao, an_anoCriacao,

                ds_cep, ds_cidade, ds_estado, ds_rua, ds_bairro, ds_numero,

                ValorMensal, estad_min, contas_inclu,

                ds_nomeRepublica, ds_descricaoRepublica,

                tipoRep, imovel, qtd_banheiro, qtd_quarto,

                fumar, pets, visitas, bebidas,

                wifi, tv, cozinha, estacionamento, ar_condicionado
            } = req.body

            const id_anunciante = req.session.user.id_anunciante

            let anuncianteProposto = await ModelDadosRepublica.findOne({
                where: { ds_emailContato: ds_emailAnfitriao }
            })

            if (anuncianteProposto) {
                req.flash("error_msg", `Esse email já esta cadastrado em outra republica`)
                return resp.redirect('/anunciar')
            }

            async function criarRepublica() {

                const anuncianteCriado = await ModelDadosRepublica.create({
                    ds_nomeAnfitriao: ds_nomeAnfitriao,
                    ds_emailContato: ds_emailAnfitriao,
                    nmr_telefoneContato: nmr_telefoneAnfitriao,
                    an_anoCriacao: an_anoCriacao
                })

                const locRepublica = await ModelLocalizacaoRepublica.create({
                    ds_cep: ds_cep,
                    ds_cidade: ds_cidade,
                    ds_estado: ds_estado,
                    ds_rua: ds_rua,
                    ds_bairro: ds_bairro,
                    ds_numero: ds_numero
                })

                const tipo = await ModelTipoRepublica.create({
                    ds_tipoRepublica: tipoRep,
                    ds_tipoImovel: imovel,
                    qtd_quartoRepublica: qtd_quarto,
                    qtd_banheiroRepublica: qtd_banheiro
                })

                const regra = await ModelRegrasRepublica.create({
                    ds_permissaoFumar: fumar,
                    ds_permissaoPets: pets,
                    ds_permissaoBebidasAlc: bebidas,
                    ds_permissaoVisitas: visitas
                })

                const aluguel = await ModelAlguel.create({
                    vl_valorMensal: ValorMensal,
                    ds_estadiaMin: estad_min,
                    ds_contasInclusas: contas_inclu
                })


                const republicaCriada = await ModelRepublica.create({
                    id_dadoRepublica: anuncianteCriado.id_dadoRepublica,
                    id_anunciante: id_anunciante,
                    id_localizacao: locRepublica.id_localizacao,
                    id_tipoRepublica: tipo.id_tipoRepublica,
                    id_regraRepublica: regra.id_regraRepublica,
                    id_valorAlguel: aluguel.id_valorAlguel,
                    //id_comodidade: comodidade.id_comodidade,
                    ds_nomeRepublica: ds_nomeRepublica,
                    ds_descricaoRepublica: ds_descricaoRepublica
                })

                if (republicaCriada) {
                    return resp.redirect('/pesquisaAnun')
                } else {
                    resp.render('anunciar', { msg: 'erro' })
                }
            }

            criarRepublica()

            console.log(criarRepublica)
        } catch (error) {
            console.log(error)
            resp.status(500).send('erro')
        }
    }
}

