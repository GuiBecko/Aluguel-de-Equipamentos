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
route.get('/aluguel/index', loginRequired, aluguelController.Index);
route.get('/aluguel/register', loginRequired, aluguelController.register)
route.post('/aluguel/create', loginRequired, aluguelController.create)
//Rotas de login
route.get('/login/index',  loginController.loginIndex)
route.get('/register/index',  loginController.registerIndex)
route.post('/login/register',  loginController.register)
route.post('/login/login',  loginController.login)
route.get('/login/logout',  loginController.logout)


module.exports = route;
