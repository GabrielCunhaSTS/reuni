const bcrypt =  require('bcrypt')
const { ModelUsuario } = require ('../models/ModelUsuario')
const { where, Model, Op } = require('sequelize')

module.exports = {
    registerUsuario: async (req, resp) => {
        const{ nm_usu,ds_emailUsu, ds_senhaUSu, ds_senhaUSuConfirmar  } = req.body;
    
        try {

            if (!req.body.ds_emailUsu || !req.body.ds_senhaUSu) {
                req.flash("success_msg", `Preencha os campos obrigatórios`)
                return resp.redirect('/registrar')
            }
    
            let usuarioproposto = await ModelUsuario.findOne({
                where: { ds_emailUsu: ds_emailUsu }
            });
    
            if (usuarioproposto) {
                req.flash("success_msg", `Esse email já esta sendo utilizado`)
                return resp.redirect('/registrar')
            }

            if (ds_senhaUSu.length < 8) {
                req.flash("success_msg", `A senha precisa ter ao menos 8 caracteres`)
                return resp.redirect('/registrar')           
            }

            if (ds_senhaUSu !== ds_senhaUSuConfirmar) {
                req.flash("success_msg", `As senhas nao correspondem`)
                return resp.redirect('/registrar')
            }
    
            const hashedPassword = await bcrypt.hash(ds_senhaUSu, 10);
    
            async function insertUsuario() {
                return await ModelUsuario.create({
                    nm_usu: nm_usu,
                    ds_emailUsu: ds_emailUsu,
                    ds_senhaUSu: hashedPassword
                });
            }
    
            await insertUsuario()

            req.flash("success_msg", `${nm_usu} Cadastrado com Sucesso!`)
            return resp.redirect('/entrar')
        } catch (error) {
            console.error(error);
            return resp.status(500).json({ msg: 'Erro no servidor...' })
        }
    }
}