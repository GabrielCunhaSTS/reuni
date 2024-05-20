const { ModelComentario } = require("../models/ModelCometario");
const { ModelUsuario } = require("../models/ModelUsuario");
const { ModelRepublica } = require("../models/modelRepublica");

module.exports = {
    adicionarComentario: async (req, res) => {
        try {
            // Lógica para adicionar um novo comentário
            const { id_republica, texto } = req.body;
            const id_usuario = req.session.user.id_usu;

            await ModelComentario.create({
                id_republica: id_republica,
                id_usu: id_usuario,
                ds_texto: texto
            });

            console.log(`O comentário foi adicionado: ${texto}`);

            // Após adicionar o comentário com sucesso, redirecione ou envie uma resposta
            res.redirect(`/perfil-Republica?id=${id_republica}`); // Redireciona para a rota que lista os comentários
        } catch (error) {
            console.error('Erro ao adicionar comentário:', error);
            res.status(500).send('Erro interno do servidor');
        }
    },
    listarComentarios: async (req, res) => {
        try {
            console.log("Iniciando função 'listarComentarios'");
            
            // Extrai o id da república dos parâmetros da requisição
            const id_republica = req.query.id;

            console.log("ID da república:", id_republica);
            
            // Lógica para encontrar todos os comentários relacionados a essa república
            console.log("Procurando comentários relacionados à república...");
            const comentarios = await ModelComentario.findAll({
                where: {
                    id_republica: id_republica
                },
                include: [
                    {
                        model: ModelUsuario,
                        attributes: ['nm_usu'] // Inclui o nome do usuário associado ao comentário
                    }
                ]
            });
    
            console.log('Comentários encontrados:', comentarios);
    
            // Renderiza a página de perfil da república, passando os comentários encontrados
            console.log("Renderizando página de perfil da república com os comentários...");
            res.render('perfilRep', { comentarios: comentarios });
        } catch (error) {
            // Em caso de erro, registra o erro e retorna uma resposta de erro para o cliente
            console.error('Erro ao listar comentários:', error);
            res.status(500).send('Erro interno do servidor');
        }
    }
}    