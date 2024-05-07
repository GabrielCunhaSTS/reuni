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

router.get('/registrar', (req, resp) => {
    resp.render('registrar')
})

router.get('/entrar', (req, resp) => {
    resp.render('login')
})

router.get('/pesquisa', checkAuth, (req, resp) => {
    resp.render('pesquisa')
})

router.get('/anunciar', checkAuth, (req, resp) => {
    resp.render('anunciar')
})

router.get('/perfil', checkAuth, (req, resp) => {
    resp.render('perfilRep')
})


module.exports = router