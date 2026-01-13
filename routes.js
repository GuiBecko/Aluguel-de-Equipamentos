const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const aluguelController = require('./src/controllers/aluguelController');
const loginController = require('./src/controllers/loginController')
const { loginRequired  } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

// Rotas de Aluguel
route.get('/aluguel/index', loginRequired, aluguelController.index);
route.get('/aluguel/register', loginRequired, aluguelController.register)
route.post('/aluguel/create', loginRequired, aluguelController.create)
route.get('/aluguel/index/:id',loginRequired, aluguelController.indexID)
route.get('/aluguel/delete/:id', loginRequired, aluguelController.delete)
route.get('/aluguel/edit/:id', loginRequired, aluguelController.edit)
route.post('/aluguel/edit/:id', loginRequired, aluguelController.editPost)

//Rotas de login
route.get('/login/index',  loginController.loginIndex)
route.get('/register/index',  loginController.registerIndex)
route.post('/login/register',  loginController.register)
route.post('/login/login',  loginController.login)
route.get('/login/logout',  loginController.logout)

module.exports = route;
