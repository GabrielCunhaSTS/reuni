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
    resp.render('login')
})

router.get('/cadastrar', (req, resp) => {
    resp.render('cadastrar')
})

router.get('/home', checkAuth, (req, resp) => {
    resp.render('home')
})

router.get('/pesquisaBarra', checkAuth, (req, resp) => {
    resp.render('pesquisaBarra')
})

router.get('/pesquisa', checkAuth, (req, resp) => {
    resp.render('pesquisa')
})

router.get('/anunciar',  (req, resp) => {
    resp.render('anunciar')
})

router.get('/cep',  (req, resp) => {
    resp.render('cep')
})

module.exports = router