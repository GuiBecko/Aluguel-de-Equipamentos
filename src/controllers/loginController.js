const Login = require('../models/LoginModel')

exports.loginIndex = (req, res) => {
    res.render('login')
}
exports.registerIndex = (req, res) => {
    res.render('register')
}
exports.register = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.register()
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('/login/index')
            })
            return
        }

        req.flash('success', 'Usuario criado com sucesso')
            req.session.save(function() {
                return res.redirect('/')
            })
    } catch (e){
        console.log(e)
        res.render('404')
    }
}
exports.login = async function (req, res) {
    try {
        const login = new Login(req.body)
        await login.login()
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(function() {
                return res.redirect('/login/index')
            })
            return
        }

        
        req.flash('success', 'Voce entrou no sistema')
        req.session.user = login.user
            req.session.save(function() {
                return res.redirect('/')
            })

    } catch (e){
        console.log(e)
        res.render('404')
    }
}
exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}