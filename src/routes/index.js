const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const logout = require('../controllers/logout');
const login = require('../controllers/login');
const registrar = require('../controllers/registerUsuAuth');
const search = require('../controllers/search');
const registrarRep = require('../controllers/registerRepAuth');
const perfilU = require('../controllers/perfilUsu');
const perfilA = require('../controllers/perfilAnun');
const mrepublicas = require('../controllers/minhasRepublicas')
const image = require('../controllers/upload')
const favoritos = require('../controllers/favoritos');
const comentarios = require('../controllers/comentarios');
const get = require('../controllers/getperfil');



function checkAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

// Registro de ambos tipos de usuário
router.post('/auth/signInU', registrar.registerUsuario);
router.post('/auth/signInA', registrar.registerAnunciante);

// Login de ambos os tipos de usuários
router.post('/auth/loginU', login.log);
router.post('/auth/loginA', login.logAnunciante);

router.get('/auth/logout', logout.logout);

router.post('/auth/cadRep', multer.array('images', 5), registrarRep.registerRepublica);

router.get('/pesquisa/:nm_digit', search.getRepByName);
router.get('/pesquisa', checkAuth, search.getAllRep);

router.get('/pesquisaAnun', checkAuth, search.getAllRepAnun)


router.get('/perfil-Usuario', checkAuth, perfilU.getPerfil);
router.get('/perfil-Anunciante', checkAuth, perfilA.getPerfilAnunciante);

router.get('/minhas-republicas', mrepublicas.getAllRep)

router.post('/perfilUsu/editar', perfilU.editPerfil);
router.post('/perfilUsu/delete', perfilU.deletePerfil);

router.post('/perfilUsu/deleteImage', image.DeleteImage);
router.post('/upload', multer.single('image'), image.uploadImage);

router.get('/perfil-Republica', checkAuth, get.getPerfilRepublica);

router.get('/perfil-RepublicaAnun', checkAuth, get.getPerfilRepublicaAnun);

router.post('/comentarios/adicionar', checkAuth, comentarios.adicionarComentario);


router.post('/favoritos', checkAuth, favoritos.addFavorito);
router.get('/favoritos', checkAuth, favoritos.getFavoritosByUsuario);




module.exports = router;
