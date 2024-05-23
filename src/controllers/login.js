const bcrypt =  require('bcrypt')
const { ModelUsuario } = require ('../models/ModelUsuario')
const { ModelAnunciante } = require ('../models/ModelAnunciante')
const { where, Model, Op } = require('sequelize')
const jwt = require('jsonwebtoken')

module.exports= {
    log: async(req,resp) => {
   
            const { ds_emailUsu, ds_senhaUSu } = req.body
    
            try{
      
                if (!req.body.ds_emailUsu || !req.body.ds_senhaUSu) {
                    req.flash("error_msg", `Preencha os campos obrigatórios`)
                    return resp.redirect('/entrar-Usuario')
                }

                const dadosUsu =  await ModelUsuario.findOne({
                    where:{ds_emailUsu: ds_emailUsu} 
                })

                if(!dadosUsu){
                    req.flash("error_msg", `Email ou Senha inválidos!`)
                    return resp.redirect('/entrar-Usuario') 
                }
    
                const compararSenha = await bcrypt.compare(
                    ds_senhaUSu, dadosUsu.ds_senhaUSu
                )
                
                if(!compararSenha){
                    req.flash("error_msg", `Email ou Senha inválidos!!`)
                    return resp.redirect('/entrar-Usuario') 
                }
                
                const token = jwt.sign({ id: dadosUsu.id }, 'JANX7AWB12BAKX')
                    resp.cookie('token', token, { httpOnly:true, secure: true })
                    req.session.user = dadosUsu
                    req.flash("success_msg", `Seja Bem-vindo(a) ${dadosUsu.nm_usu}`)
                    console.log(token)
                    
                    console.log("ID do usuário na sessão:", req.session.user.id_usu);   
                    return resp.redirect('/pesquisa')
                }catch(erro){
                    console.error(erro)
                    console.log(req.body)
                    return resp.status(500).json({ 
                        message: 'Erro no servidor ao logar! (Erro genérico...)' 
                    })
            }
        },
        logAnunciante: async(req,resp) => {
   
            const { ds_emailAunci, ds_senhaAnunci } = req.body
    
            try{

                const dadosAnunciante =  await ModelAnunciante.findOne({
                    where:{ds_emailAunci: ds_emailAunci} 
                })

                if(!dadosAnunciante){
                    req.flash("error_msg", `Email nválidos!`)
                    return resp.redirect('/entrar-Anunciante') 
                }
    
                const compararSenha = await bcrypt.compare(
                    ds_senhaAnunci, dadosAnunciante.ds_senhaAnunci
                )
                
                if(!compararSenha){
                    req.flash("error_msg", `Email ou Senha inválidos!!`)
                    return resp.redirect('/entrar-Anunciante') 
                }
                
                const token = jwt.sign({ id: ds_senhaAnunci.id }, 'JANX7AWB12BAKX')
                    resp.cookie('token', token, { httpOnly:true, secure: true })
                    req.session.user = dadosAnunciante
                    req.flash("success_msg", `Seja Bem-vindo(a) ${dadosAnunciante.nm_anunciante}`)
                    console.log(token)
                    
                    console.log("ID do usuário na sessão:", req.session.user.id_anunciante);   
                    return resp.redirect('/pesquisaAnun')
                }catch(erro){
                    console.error(erro)
                    console.log(req.body)
                    return resp.status(500).json({ 
                        message: 'Erro no servidor ao logar! (Erro genérico...)' 
                    })
            }
        }
    }