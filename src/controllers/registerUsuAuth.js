const bcrypt = require('bcrypt')
const { ModelUsuario } = require('../models/ModelUsuario')
const { ModelAnunciante } = require('../models/ModelAnunciante')


module.exports = {
    registerUsuario: async (req, resp) => {
        const {
            nm_usu,
            ds_emailUsu,
            ds_senhaUSu,
            ds_senhaUSuConfirmar,
            dt_nascimento,
            cpf,
            descricao,
            sexo,
            estado
        } = req.body

        try {
            if (!ds_emailUsu || !ds_senhaUSu) {
                req.flash("error_msg", `Preencha os campos obrigatórios`)
                return resp.redirect('/registrar-Usuario')
            }

            const usuarioproposto = await ModelUsuario.findOne({
                where: { ds_emailUsu: ds_emailUsu }
            })

            const cpfproposto = await ModelUsuario.findOne({
                where: { ds_cpfUsu: cpf }
            })

            if(cpfproposto){
                req.flash("error_msg", `Esse cpf já está sendo utilizado`)
                return resp.redirect('/registrar-Usuario')
            }

            if (usuarioproposto) {
                req.flash("error_msg", `Esse email já está sendo utilizado`)
                return resp.redirect('/registrar-Usuario')
            }

            if (ds_senhaUSu.length < 8) {
                req.flash("error_msg", `A senha precisa ter pelo menos 8 caracteres`)
                return resp.redirect('/registrar-Usuario')
            }

            if (ds_senhaUSu !== ds_senhaUSuConfirmar) {
                req.flash("error_msg", `As senhas não correspondem`)
                return resp.redirect('/registrar-Usuario')
            }

            const hashedPassword = await bcrypt.hash(ds_senhaUSu, 10)

            const dataNasc = new Date(dt_nascimento);
            const dataAtual = new Date();
            let idadeFormatada = dataAtual.getFullYear() - dataNasc.getFullYear();

            const mes = dataAtual.getMonth() - dataNasc.getMonth();
            if (mes < 0 || (mes === 0 && mes.getDate() < dataNasc.getDate())) {
                idadeFormatada--;
            }

            async function insertUsuario() {
                try {
                    const usuario = await ModelUsuario.create({
                        nm_usu: nm_usu,
                        ds_emailUsu: ds_emailUsu,
                        ds_senhaUSu: hashedPassword,
                        qt_idade: idadeFormatada,
                        ds_cpfUsu: cpf,
                        ds_descricaoPerfil: descricao,
                        sx_sexoUsu: sexo,
                        id_estadoOrigem: estado
                    })

                    if (usuario) {
                        console.log("Usuário criado")
                    }
                } catch (error) {
                    console.error("Erro ao criar usuário:", error)
                }
            }

            await insertUsuario();
            req.flash("success_msg", `${nm_usu} cadastrado com sucesso!`)
            return resp.redirect('/entrar-Usuario');
        } catch (error) {
            console.error("Erro no servidor:", error);
            return resp.status(500).json({ msg: 'Erro no servidor...' })
        }
    },
    registerAnunciante: async (req, res) => {
        const {
            nm_anunciante,
            ds_emailAunci,
            ds_senhaAnunci,
            ds_senhaAnunciConfirmar,
            dt_nascimento,
            cpf,
            sexo,
        } = req.body

        try {
            const anuncianteproposto = await ModelAnunciante.findOne({
                where: { ds_emailAunci: ds_emailAunci }
            });

            const cpfproposto  = await ModelAnunciante.findOne({
                where: { ds_cpfAnunci: cpf }
            });

            if (anuncianteproposto) {
                req.flash("error_msg", `Esse email já está sendo utilizado`)
                return res.redirect('/registrar-Anunciante')
            }

            if (cpfproposto) {
                req.flash("error_msg", `Esse CPF já está sendo utilizado`)
                return res.redirect('/registrar-Anunciante')
            }

            if (ds_senhaAnunci.length < 8) {
                req.flash("error_msg", `A senha precisa ter pelo menos 8 caracteres`)
                return res.redirect('/registrar-Anunciante')
            }

            if (ds_senhaAnunci !== ds_senhaAnunciConfirmar) {
                req.flash("error_msg", `As senhas não correspondem`)
                return res.redirect('/registrar-Anunciante')
            }

            const hashedPassword = await bcrypt.hash(ds_senhaAnunci, 10)

            const dataNasc = new Date(dt_nascimento);
            const dataAtual = new Date();
            let idadeFormatada = dataAtual.getFullYear() - dataNasc.getFullYear();

            const mes = dataAtual.getMonth() - dataNasc.getMonth();
            if (mes < 0 || (mes === 0 && mes.getDate() < dataNasc.getDate())) {
                idadeFormatada--;
            }

            async function insertAnunciante() {
                try {

                    const anunciante = await ModelAnunciante.create({
                        nm_anunciante: nm_anunciante,
                        ds_emailAunci: ds_emailAunci,
                        ds_senhaAnunci: hashedPassword,
                        qt_idadeAnunci: idadeFormatada,
                        ds_cpfAnunci: cpf,
                        sg_sexoAnunci: sexo,
                    })


                    if (anunciante) {
                        console.log("Usuário criado")
                    }
                } catch (error) {
                    console.error("Erro ao criar usuário:", error)
                }
            }

            await insertAnunciante();
            req.flash("success_msg", `${nm_anunciante} cadastrado com sucesso!`)
            return res.redirect('/entrar-Anunciante')
        } catch (error) {
            console.error("Erro no servidor:", error)
            return res.status(500).json({ msg: 'Erro no servidor...' })
        }
    }
}
