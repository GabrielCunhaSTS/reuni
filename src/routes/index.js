const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
const Login = require('../controllers/login')
const Registrar = require('../controllers/registerUsuAuth')
const search = require('../controllers/search')


function checkAuth(req, resp, next){
    if(req.session.user){
        next()
    } else{
        resp.redirect('/')
    }
}

router.post('/auth/signIn', Registrar.registerUsuario)
router.post('/auth/login', Login.log)
router.get('/auth/logout', auth.logout)
router.get('/pesquisa/:nm_digit', search.getRepByName);
router.get('/pesquisa', checkAuth, search.getAllRep);


module.exports = router