const bcrypt =  require('bcrypt')
const { ModelUsuario } = require ('../models/ModelUsuario')
const { where, Model, Op } = require('sequelize')

module.exports = {
    registerUsuario: async (req, resp) => {
        const{ nm_usu,ds_emailUsu, ds_senhaUSu, ds_senhaUSuConfirmar  } = req.body;
    
        try {

            if (!req.body.ds_emailUsu || !req.body.ds_senhaUSu) {
                return resp.status(400).json({ msg: 'Campos obrigatórios não fornecidos' })
            }
    
            let usuarioproposto = await ModelUsuario.findOne({
                where: { ds_emailUsu: ds_emailUsu }
            });
    
            if (usuarioproposto) {
                return resp.status(400).json({ msg: 'Já existe um usuário com esse email!' })
            }

            if (ds_senhaUSu.length < 8) {
                return resp.status(400).json({ msg: 'A senha deve ter pelo menos 8 caracteres'})
            }

            if (ds_senhaUSu !== ds_senhaUSuConfirmar) {
                return resp.status(400).json({msg: 'As senhas não coincidem'})
            }
    
            const hashedPassword = await bcrypt.hash(ds_senhaUSu, 10);
    
            async function insertUsuario() {
                return await ModelUsuario.create({
                    nm_usu: nm_usu,
                    ds_emailUsu: ds_emailUsu,
                    ds_senhaUSu: hashedPassword
                });
            }
    
            await insertUsuario();
    
            return resp.status(201).json({ msg: `Usuário ${nm_usu} criado com sucesso!` })
        } catch (error) {
            console.error(error);
            return resp.status(500).json({ msg: 'Erro no servidor...' })
        }
    }
}