const express = require('express')
const router = express.Router()
const logout = require('../controllers/logout')
const login = require('../controllers/login')
const registrar = require('../controllers/registerUsuAuth')
const search = require('../controllers/search')
const registrarRep = require('../controllers/registerRepAuth')
const perfilU = require('../controllers/perfilUsu')

function checkAuth(req, resp, next){
    if(req.session.user){
        next()
    } else{
        resp.redirect('/')
    }
}

//registro de ambos tipos de usuario
router.post('/auth/signInU', registrar.registerUsuario)
router.post('/auth/signInA', registrar.registerAnunciante)

//login de ambos os tipos de usuarios
router.post('/auth/loginU', login.log)
router.post('/auth/loginA', login.logAnunciante)

router.get('/auth/logout', logout.logout)

router.post('/auth/cadRep', registrarRep.registerRepublica)

router.get('/pesquisaUsu/:nm_digit', search.getRepByName);
router.get('/pesquisaUsu', checkAuth, search.getAllRep);


router.get('/perfilU', checkAuth, perfilU.getPerfil);
router.post('/perfil/editar', perfilU.editPerfil);
router.get('/perfil/delete', perfilU.deletePerfil);

router.get('/perfil-Republica', checkAuth, search.getPerfilUrl)
   

module.exports = router