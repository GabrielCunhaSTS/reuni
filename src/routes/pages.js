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

router.get('/home', (req, resp) => {
    resp.render('home')
})

router.get('/pesquisaBarra', (req, resp) => {
    resp.render('pesquisaBarra')
})

router.get('/pesquisa', (req, resp) => {
    resp.render('pesquisa')
})

module.exports = router