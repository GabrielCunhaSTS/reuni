const express = require('express')
const session = require('express-session')
const router = express.Router()
const path = require('path')


function checkAuth(req, resp, next){
    if(req.session.user){
        next()
    } else{
        resp.redirect('/')
    }
}

router.get('/', (req, resp) => {
    resp.render('home')
})

router.get('/registrar-Usuario', (req, resp) => {
    resp.render('registrarUsu')
})

router.get('/registrar-Anunciante', (req, resp) => {
    resp.render('registrarAnun')
})

router.get('/entrar-Usuario', (req, resp) => {
    resp.render('loginUsu') 
})

router.get('/entrar-Anunciante', (req, resp) => {
    resp.render('loginAnun')
})

router.get('/pesquisa', checkAuth, (req, resp) => {
    resp.render('pesquisaUsu')
})

router.get('/pesquisaAnun', checkAuth, (req, resp) => {
    resp.render('pesquisaAnun')
})

router.get('/anunciar', checkAuth, (req, resp) => {
    resp.render('anunciar')
})

router.get('/perfil-Republica', checkAuth, (req, resp) => {
    resp.render('perfilRep')
})

router.get('/perfil-Usuario', checkAuth, (req, resp) => {
    resp.render('perfilUsu')
})

router.get('/perfil-Anunciante',  (req, resp) => {
    resp.render('perfilAnun')
})

router.get('/editar-perfil', checkAuth,(req, resp) => {
    resp.render('editar-perfil')
})


module.exports = router