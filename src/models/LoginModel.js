const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }
    
    async login(){
        this.valida()
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({email: this.body.email})

        if(!this.user){
            this.errors.push('Usuario nao existe')
            return
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida')
            this.user = null
        }
    }

    async register(){
        this.valida()
        if(this.errors.length > 0) return;
        
        await this.userExists()
        
        if(this.errors.length > 0) return;
        
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)

        this.user = await LoginModel.create(this.body)
  
    }

    async userExists(){
        const user = await LoginModel.findOne({email: this.body.email})
        if (user) this.errors.push('Usuario ja existe')
    }

    valida(){
        this.cleanUp()
        if(!validator.isEmail(this.body.email)){
            this.errors.push('Email invalido')
            console.log('email invalido')
        }
        if(this.body.password.length < 6 || this.body.password.length > 10){
            this.errors.push('Senha invalida')
            console.log('senhainvalida')
        }
    }

    cleanUp(){
        for(const key in this.body){
            if (typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }

        this.body = { //tira o csrftoken
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login