const express = require('express');
const router = express.Router();
const logout = require('../controllers/logout');
const login = require('../controllers/login');
const registrar = require('../controllers/registerUsuAuth');
const search = require('../controllers/search');
const registrarRep = require('../controllers/registerRepAuth');
const perfilU = require('../controllers/perfilUsu');
const perfilA = require('../controllers/perfilAnun');
const mrepublicas = require('../controllers/minhasRepublicas')
const image = require('../controllers/upload')
const multer = require('../middleware/multer');
const upload = require('../controllers/upload');

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

router.post('/auth/cadRep', registrarRep.registerRepublica);

router.get('/pesquisa/:nm_digit', search.getRepByName);
router.get('/pesquisa', checkAuth, search.getAllRep);


router.get('/perfil-Anunciante', checkAuth, perfilA.getPerfilAnunciante);


router.get('/minhas-republicas', mrepublicas.getAllRep)

router.get('/perfil-Usuario', checkAuth, perfilU.getPerfil);
router.post('/perfilUsu/editar', perfilU.editPerfil);
router.post('/perfilUsu/delete', perfilU.deletePerfil);

router.post('/perfilUsu/deleteImage', image.DeleteImage);
router.post('/upload', multer.single('image'), image.uploadImage);

router.get('/perfil-Republica', checkAuth, search.getPerfilUrl);

module.exports = router;
