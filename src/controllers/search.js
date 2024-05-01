const { ModelRepublica } = require('../models/modelRepublica')
const { ModelTipoRepublica } = require('../models/ModelTipoRepublica')
const { ModelAlguel } = require('../models/ModelAluguel')
const { ModelLocalizacaoRepublica } = require('../models/ModelLocalizacaoRepublica')
const { Sequelize, Op } = require('sequelize')
const { ModelDadosRepublica } = require('../models/ModelDadosRepublicas')

module.exports = {
    // getUsuarioByName: async (req, res) => {
    //     try {
    //         const nm_digit = req.params.nm_digit
    //         const resultado = await ModelUsuario.findAll({
    //             where: {
    //                 nm_usu:{
    //                 [Op.like]: `${nm_digit}%`
    //                 }
    //             }
    //         });
    //         if (resultado) {
    //             res.json(resultado); // Enviar resultado como JSON
    //         } else {
    //             res.status(404).json({ message: 'Usuário não encontrado' });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Erro interno do servidor' });
    //     }
    // },

    getRepByName: async (req, res) =>{
        console.log("Rota getRepByName acionada"); 
        try{
            const nm_digit = req.params.nm_digit
            console.log("Termo de pesquisa:", nm_digit);

            const resultado = await ModelRepublica.findAll({
                attributes:['ds_nomeRepublica', 'ds_descricaoRepublica'],
                where: {
                    ds_nomeRepublica:{
                        [Op.like]: `${nm_digit}%`
                    }
                }, raw:true,
                include:[
                    {
                        model: ModelAlguel,
                        attributes: ['vl_valorMensal'],
                        required: true
                    }
                ]
            })
            console.log("Resultados da pesquisa:", resultado); 

           if (resultado && resultado.length > 0) {
            res.json(resultado);
        } else {
            console.log("Nenhum resultado encontrado.");
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
        }
    }