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
route.get('/contato', loginRequired, aluguelController.paginaInicial);

//Rotas de login
route.get('/login/index',  loginController.loginIndex)
route.get('/register/index',  loginController.registerIndex)
route.post('/login/register',  loginController.register)
route.post('/login/login',  loginController.login)
route.get('/login/logout',  loginController.logout)


module.exports = route;
