const bcrypt =  require('bcrypt')
const { ModelUsuario } = require ('../models/ModelUsuario')
const { where, Model, Op } = require('sequelize')
const jwt = require('jsonwebtoken')

module.exports= {
    log: async(req,resp) => {
   
            const { ds_emailUsu, ds_senhaUSu } = req.body
    
            try{
      
                if (!req.body.ds_emailUsu || !req.body.ds_senhaUSu) {
                    return resp.status(400).json({ msg: 'Campos obrigatórios não fornecidos' })
                }

                const dadosUsu =  await ModelUsuario.findOne({
                    where:{ds_emailUsu: ds_emailUsu} 
                })

                if(!dadosUsu){
                    return resp.status(404).json({msg: 'Usuário c/ esse email não encontrado'
                    })  
                }
    
                const compararSenha = await bcrypt.compare(
                    ds_senhaUSu, dadosUsu.ds_senhaUSu
                )
    
                if(!compararSenha){
                    return resp.status(401).json({ msg: 'Senha Inválida!' }) 
                }
                
                const token = jwt.sign({ id: dadosUsu.id }, 'JANX7AWB12BAKX')
                    resp.cookie('token', token, { httpOnly:true, secure: true })
                    req.session.user = dadosUsu
                    req.flash("success_msg", `Seja Bem-vindo(a) ${dadosUsu.nm_usu}`)    
                    return resp.redirect('/')
                }catch(erro){
                    console.error(erro)
                    console.log(req.body)
                    return resp.status(500).json({ 
                        message: 'Erro no servidor ao logar! (Erro genérico...)' 
                    })
            }
        }
    }