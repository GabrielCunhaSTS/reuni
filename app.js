const express = require('express')
const { conecBanco, bd } = require('./src/config/bdConec')
const appWeb = express()
const bodyParser = require('body-parser')
const path = require('path')
const routes = require('./src/routes/index')
const { imgPerfil } =require('./src/controllers/upload')
const session = require('express-session')
const multer = require('multer');
const cookieParser =  require('cookie-parser')
const { json } = require('sequelize')
const flash =  require ('connect-flash')

appWeb.use(bodyParser.urlencoded({ extended: false }));
appWeb.use(express.json())
appWeb.use(cookieParser())
appWeb.use(flash())


//criando uma seção com cookies 
appWeb.use(session({
    secret:'ReUni',
    resave:true,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 60 * 2300}
}))



appWeb.use(imgPerfil)

appWeb.use((req,resp,next) => {
    resp.locals.success_msg =  req.flash("success_msg")
    resp.locals.error_msg = req.flash("error_msg")  
    next()
})

appWeb.use('/', routes)
appWeb.use(express.static('public'));


const Img = path.join(__dirname, 'src/uploads')
appWeb.use( '/up',express.static(Img))

appWeb.set('view engine', 'hbs')// setando o padrao de vizualização para aquivos views
appWeb.set('views', path.join(__dirname, 'src/views'))

const PublicDirectory = path.join(__dirname, 'src/public') //diretorio de css
appWeb.use(express.static(PublicDirectory))

const imgDirectory = path.join(__dirname, 'src/res') //diretorio de imagem
appWeb.use(express.static(imgDirectory))

const scriptDirectory = path.join(__dirname, 'src/scripts') //diretorio de scripts
appWeb.use(express.static(scriptDirectory))

//definir rotas
appWeb.use('/', require('./src/routes/pages'))
appWeb.use('/auth', require('./src/routes/index'))

conecBanco.sync()//fazendo a conexao do banco

conecBanco.authenticate().then(() =>{ //exibindo uma msg cassim que conecta com o banco
    console.log(`Conexão com o banco: ${bd} bem sucedida`)
}
).catch(erroConn => {
    console.error(`Erro na conexão com o banco ${bd}`, erroConn)
})

//fazendo minha aplicação virar um servidor
const port = 3001
appWeb.listen(port, ()=> {
    console.log(`Servidor rodando na porta ${port}`)
})  
