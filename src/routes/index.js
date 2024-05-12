const express = require('express')
const router = express.Router()
const logout = require('../controllers/logout')
const login = require('../controllers/login')
const registrar = require('../controllers/registerUsuAuth')
const search = require('../controllers/search')
const cadRep = require('../controllers/registerAnunAuth')
const perfil = require('../controllers/perfil')

function checkAuth(req, resp, next){
    if(req.session.user){
        next()
    } else{
        resp.redirect('/')
    }
}

router.post('/auth/signIn', registrar.registerUsuario)
router.post('/auth/cadRep', cadRep.registerRepublica)
router.post('/auth/login', login.log)
router.get('/auth/logout', logout.logout)
router.get('/pesquisa/:nm_digit', search.getRepByName);
router.get('/pesquisa', checkAuth, search.getAllRep);
router.get('/perfil', perfil.getPerfil);
router.post('/perfil/editar', perfil.editarPerfil);


module.exports = router