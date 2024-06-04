const { ModelRepublica } = require('../models/modelRepublica');
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica');
const { ModelAlguel } = require('../models/ModelAluguel');
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica');
const { ModelDadosRepublica } = require('../models/ModelDadosRepublicas')
const { ModelRegrasRepublica } = require('../models/ModelRegrasRepublica')
const { ModelComodidades } = require('../models/ModelComodidades')
const { Sequelize, Op } = require('sequelize');
const { ModelImagemRep } = require('../models/ModelImagemRep');

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
                } = req.body;
        
                const id_anunciante = req.session.user.id_anunciante;
        
                let anuncianteProposto = await ModelDadosRepublica.findOne({
                    where: { ds_emailContato: ds_emailAnfitriao }
                });
        
                if (anuncianteProposto) {
                    req.flash("error_msg", `Esse email já está cadastrado em outra república`);
                    return resp.redirect('/anunciar');
                }
        
                async function criarRepublica() {

                  let numeroInteiro = parseInt(nmr_telefoneAnfitriao.replace(/\D/g, ''), 10);
 
                    const anuncianteCriado = await ModelDadosRepublica.create({
                        id_anunciante: id_anunciante,
                        ds_nomeAnfitriao: ds_nomeAnfitriao,
                        ds_emailContato: ds_emailAnfitriao,
                        nmr_telefoneContato: numeroInteiro,
                        an_anoCriacao: an_anoCriacao
                    });
        
                    const locRepublica = await ModelLocalizacaoRepublica.create({
                        ds_cep: ds_cep,
                        ds_cidade: ds_cidade,
                        ds_estado: ds_estado,
                        ds_rua: ds_rua,
                        ds_bairro: ds_bairro,
                        ds_numero: ds_numero
                    });
        
                    const tipo = await ModelTipoRepublica.create({
                        ds_tipoRepublica: tipoRep,
                        ds_tipoImovel: imovel,
                        qtd_quartoRepublica: qtd_quarto,
                        qtd_banheiroRepublica: qtd_banheiro
                    });
        
                    const regra = await ModelRegrasRepublica.create({
                        ds_permissaoFumar: fumar,
                        ds_permissaoPets: pets,
                        ds_permissaoBebidasAlc: bebidas,
                        ds_permissaoVisitas: visitas
                    });

                    const comodidades =  await ModelComodidades.create({
                        ds_wifi: wifi,
                        ds_tv: tv,
                        ds_cozinha: cozinha,
                        ds_garagem: estacionamento,
                        ds_arcondicionado: ar_condicionado
                    })

                    let valorFinal = 0;
                    if (ValorMensal) {
                        valorFinal = parseFloat(ValorMensal.replace('R$', '').replace(/\./g, '').replace(',', '.'));
                    }
        
                    const aluguel = await ModelAlguel.create({
                        vl_valorMensal: valorFinal,
                        ds_estadiaMin: estad_min,
                        ds_contasInclusas: contas_inclu
                    });
        
                    const republicaCriada = await ModelRepublica.create({
                        id_dadoRepublica: anuncianteCriado.id_dadoRepublica,
                        id_anunciante: id_anunciante,
                        id_localizacao: locRepublica.id_localizacao,
                        id_tipoRepublica: tipo.id_tipoRepublica,
                        id_regraRepublica: regra.id_regraRepublica,
                        id_valorAlguel: aluguel.id_valorAlguel,
                        id_comodidade: comodidades.id_comodidade,
                        ds_nomeRepublica: ds_nomeRepublica,
                        ds_descricaoRepublica: ds_descricaoRepublica
                    });
        
                    if (republicaCriada) {
                        const imagens = req.files;
                        if (imagens && imagens.length > 0) {
                            for (const imagem of imagens) {
                                await ModelImagemRep.create({
                                    id_republica: republicaCriada.id_republica,
                                    nome_arquivo: imagem.mimetype,
                                    nome_imagem: imagem.filename
                                });
                            }
                        }
                        return resp.redirect('/pesquisaAnun')
                    } else {
                        resp.render('anunciar', { msg: 'erro' })
                    req.flash("success_msg", `República ${ds_nomeRepublica} criada com sucesso!`);
                    return resp.redirect('/anunciar');
                }
            }
                criarRepublica();
                console.log(criarRepublica)
            } catch (error) {
                console.error("Erro no servidor:", error);
                req.flash("error_msg", `Erro no servidor: ${error.message}`);
                return resp.redirect('/anunciar');
            }
        }
    }