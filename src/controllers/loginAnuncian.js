const { ModelAnunciante } = require ('../models/ModelAnunciante')
const { where, Model, Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt =  require('bcrypt')

module.exports= {
    logAnunciante: async(req,resp) => {
   
            const { ds_emailAunci, ds_senhaAnunci } = req.body
    
            try{
      
                if (!req.body.ds_emailaAunci || !req.body.ds_senhaAnunci) {
                    req.flash("error_msg", `Preencha os campos obrigatórios`)
                    return resp.redirect('/entrar')
                }

                const dadosAnunciante =  await ModelAnunciante.findOne({
                    where:{ds_emailaAunci: ds_emailAunci} 
                })

                if(!dadosAnunciante){
                    req.flash("error_msg", `Email ou Senha inválidos!`)
                    return resp.redirect('/entrar') 
                }
    
                const compararSenha = await bcrypt.compare(
                    ds_senhaAnunci, dadosAnunciante.ds_senhaAnunci
                )
                
                if(!compararSenha){
                    req.flash("error_msg", `Email ou Senha inválidos!!`)
                    return resp.redirect('/entrar') 
                }
                
                const token = jwt.sign({ id: ds_senhaAnunci.id }, 'JANX7AWB12BAKX')
                    resp.cookie('token', token, { httpOnly:true, secure: true })
                    req.session.user = dadosAnunciante
                    req.flash("success_msg", `Seja Bem-vindo(a) ${dadosAnunciante.nm_anunciante}`)
                    console.log(token)
                    
                    console.log("ID do usuário na sessão:", req.session.user);   
                    return resp.redirect('/pesquisa')
                }catch(erro){
                    console.error(erro)
                    console.log(req.body)
                    return resp.status(500).json({ 
                        message: 'Erro no servidor ao logar! (Erro genérico...)' 
                    })
            }
        }
    }