const { ModelRepublica } = require('../models/modelRepublica');
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica');
const { ModelAlguel } = require('../models/ModelAluguel');
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica');
const { Sequelize, Op } = require('sequelize');
const { ModelDadosRepublica } = require('../models/ModelDadosRepublicas')
module.exports = {
    registerRepublica: async(req,resp) => {
        try{
            const { ds_nomeAnfitriao,
                ds_emailAnfitriao,
                nmr_telefoneAnfitriao,
                an_anoCriacao,
                ds_cep,
                ds_cidade,
                ds_estado,
                ds_rua,
                ds_bairro,
                ds_numero,  
                ValorMensal,
                estad_min,
                contas_inclu,
                ds_nomeRepublica,
                ds_descricaoRepublica,
                //Mista,
                //Fem,
                // Apartamento
            } = req.body


            let anuncianteProposto = await ModelDadosRepublica.findOne({
                where: { ds_emailAnfitriao: ds_emailAnfitriao }
            })

            if(anuncianteProposto){
            }
            
            async function criarRepublica(){

                const anuncianteCriado = await ModelDadosRepublica.create({
                    ds_nomeAnfitriao: ds_nomeAnfitriao,
                    ds_emailAnfitriao: ds_emailAnfitriao,
                    nmr_telefoneAnfitriao: nmr_telefoneAnfitriao,
                    an_anoCriacao: an_anoCriacao
                })

                const locRepublica = await ModelLocalizacaoRepublica.create({
                    ds_cep: ds_cep,
                    ds_cidade: ds_cidade,
                    ds_estado: ds_estado,
                    ds_rua:  ds_rua,
                    ds_bairro: ds_bairro,
                    ds_numero: ds_numero
                })

                const aluguel = await ModelAlguel.create({
                    vl_valorMensal:  ValorMensal,
                    ds_estadiaMin:  estad_min,
                    ds_contasInclusas: contas_inclu
                })

                const republica =  await ModelRepublica.create({
                    id_dadoRepublica: anuncianteCriado.id_dadoRepublica,
                    id_localizacao:  locRepublica.id_localizacao,
                    // id_tipoRepublica: 
                    //id_regraRepublica: 
                    id_valorAlguel: aluguel.id_valorAlguel,
                    //id_comodidade:
                    ds_nomeRepublica: ds_nomeRepublica,
                    ds_descricaoRepublica: ds_descricaoRepublica
                })
            }
            
        }catch(error){

    }
}
}

