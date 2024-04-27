const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
const Login = require('../controllers/login')
const Registrar = require('../controllers/registerUsuAuth')
const Search = require('../controllers/search')

router.post('/auth/signIn', Registrar.registerUsuario)
router.post('/auth/login', Login.log)
router.get('/auth/logout', auth.logout)
router.get('/pesquisa/:nm_digit', Search.getUsuarioByName);

module.exports = router