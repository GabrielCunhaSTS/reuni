const express = require('express')
const router = express.Router()
const logout = require('../controllers/logout')
const loginU = require('../controllers/login')
const loginA = require('../controllers/loginAnuncian')
const registrarU = require('../controllers/registerUsuAuth')
const registrarA = require('../controllers/registerAnuAuth')
const search = require('../controllers/search')
const cadRep = require('../controllers/registerRepAuth')
const perfil = require('../controllers/perfil')

function checkAuth(req, resp, next){
    if(req.session.user){
        next()
    } else{
        resp.redirect('/')
    }
}

//registro de ambos tipos de usuario
router.post('/auth/signInU', registrarU.registerUsuario)
router.post('/auth/signInA', registrarA.registerAnunciante)

//login de ambos os tipos de usuarios
router.post('/auth/loginU', loginU.log)
router.post('/auth/loginA', loginA.logAnunciante)

router.post('/auth/cadRep', cadRep.registerRepublica)
router.get('/auth/logout', logout.logout)
router.get('/pesquisa/:nm_digit', search.getRepByName);
router.get('/pesquisa', checkAuth, search.getAllRep);
router.get('/perfil', checkAuth, perfil.getPerfil);
router.post('/perfil/editar', perfil.editPerfil);
router.get('/perfil/delete', perfil.deletePerfil);
router.get('/perfil-Republica', checkAuth, search.getPerfilUrl)
   

module.exports = router