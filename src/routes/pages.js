const express = require('express')
const session = require('express-session')
const router = express.Router()
const path = require('path')


function checkAuth(req, res, next){
    if(req.session.user){
        next()
    } else{
        res.redirect('/')
    }
}

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/registrar-Usuario', (req, res) => {
    res.render('registrarUsu')
})

router.get('/registrar-Usuario2', (req, res) => {
    res.render('registrarUsuPt2')
})

router.get('/registrar-Anunciante', (req, res) => {
    res.render('registrarAnun')
})

router.get('/entrar-Usuario', (req, res) => {
    res.render('loginUsu') 
})

router.get('/entrar-Anunciante', (req, res) => {
    res.render('loginAnun')
})

router.get('/pesquisa', checkAuth, (req, res) => {
    res.render('pesquisaUsu')
})

router.get('/teste', (req, res) => {
    res.render('teste')
})

router.get('/pesquisaAnun', checkAuth, (req, res) => {
    res.render('pesquisaAnun')
})

router.get('/anunciar', checkAuth, (req, res) => {
    res.render('anunciar')
})

router.get('/perfil-Republica', checkAuth, (req, res) => {
    res.render('perfilRep')
})

router.get('/perfil-Usuario', checkAuth, (req, res) => {
    res.render('perfilUsu')
})

router.get('/perfil-Anunciante',  (req, res) => {
    res.render('perfilAnun')
})

router.get('/editar-perfil', checkAuth,(req, res) => {
    res.render('editar-perfil')
})

router.get('/minhas-republicas', checkAuth,(req, res) => {
    res.render('minhasrepublicas')
})

router.get('/favoritos', checkAuth, (req, res) => {
    res.render('favoritos')
})

module.exports = router
