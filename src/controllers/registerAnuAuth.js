const { ModelAnunciante } = require('../models/ModelAnunciante')

module.exports = {
    registerAnunciante: async(req, res) =>{
        const {
            nm_anunciante,
            ds_emailAunci,
            ds_senhaAnunci,
            ds_senhaAnunciConfirmar,
            idade,
            cpf,
            sexo,
        } = req.body;

        try {
            const anuncianteproposto = await ModelAnunciante.findOne({
                where: { ds_emailaAunci: ds_emailAunci }
            });

            if (anuncianteproposto) {
                req.flash("error_msg", `Esse email já está sendo utilizado`);
                return res.redirect('/registrar');
            }

            if (ds_senhaAnunci.length < 8) {
                req.flash("error_msg", `A senha precisa ter pelo menos 8 caracteres`);
                return res.redirect('/registrar');
            }

            if (ds_senhaAnunci !== ds_senhaAnunciConfirmar) {
                req.flash("error_msg", `As senhas não correspondem`);
                return res.redirect('/registrar');
            }

            const hashedPassword = await bcrypt.hash(ds_senhaAnunci, 10);

            async function insertAnunciante(){
                try {
                    
                    const anunciante = await ModelUsuario.create({
                        nm_anunciante: nm_anunciante,
                        ds_emailAunci: ds_emailAunci,
                        ds_senhaAnunci: hashedPassword,
                        qt_idadeAnunci: idade,
                        ds_cpfAnunci: cpf,
                        sg_sexoAnunci: sexo,
                    })


                    if (anunciante) {
                        console.log("Usuário criado");
                    }
                } catch (error) {
                    console.error("Erro ao criar usuário:", error);
                }
            }

            await insertAnunciante();
            req.flash("success_msg", `${nm_usu} cadastrado com sucesso!`);
            return res.redirect('/entrar');
        } catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ msg: 'Erro no servidor...' });
        }
    }
}