const bcrypt =  require('bcrypt')
const { ModelUsuario } = require ('../models/ModelUsuario')
const { where, Model, Op } = require('sequelize')
const jwt = require('jsonwebtoken')

module.exports= {
    log: async(req,resp) => {
   
            const { ds_emailUsu, ds_senhaUSu } = req.body
    
            try{
      
                if (!req.body.ds_emailUsu || !req.body.ds_senhaUSu) {
                    req.flash("error_msg", `Preencha os campos obrigatórios`)
                    return resp.redirect('/entrar')
                }

                const dadosUsu =  await ModelUsuario.findOne({
                    where:{ds_emailUsu: ds_emailUsu} 
                })

                if(!dadosUsu){
                    req.flash("error_msg", `Esse email não está registrado! Por favor Registre!`)
                    return resp.redirect('/entrar') 
                }
    
                const compararSenha = await bcrypt.compare(
                    ds_senhaUSu, dadosUsu.ds_senhaUSu
                )
                
                if(!compararSenha){
                    req.flash("error_msg", `Senha inválida!`)
                    return resp.redirect('/entrar') 
                }
                
                const token = jwt.sign({ id: dadosUsu.id }, 'JANX7AWB12BAKX')
                    resp.cookie('token', token, { httpOnly:true, secure: true })
                    req.session.user = dadosUsu
                    req.flash("success_msg", `Seja Bem-vindo(a) ${dadosUsu.nm_usu}`)
                    console.log(token)    
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