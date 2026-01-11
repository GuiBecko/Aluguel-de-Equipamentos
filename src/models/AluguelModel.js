const mongoose = require('mongoose')

const AluguelSchema = new mongoose.Schema({
    comprador: {type: String, required: true},
    endereco: {type: String, required: false},
    tipoEquipamento: {type: String, required: true},
    valor: {type: Number, required: true},
    dataAluguel: {type: Date, required: true, default: Date.now},
    terminoAluguel: {type: Date, required: true},
    formaPagamento: {type: String, required: true} 
})

const AluguelModel = mongoose.model('Aluguel', AluguelSchema)

class Aluguel {
    constructor(body){
        this.body = body
        this.errors = []
        this.aluguel = null
    }

    async register(){
        this.valida()
        if(this.errors.length > 0) return
        this.aluguel = await AluguelModel.create(this.body)
    }
    valida(){
        this.cleanUp()
        
        //validação de campos obrigatórios
        if(!this.body.comprador) this.errors.push('Nome do comprador é obrigatório.');
        if(!this.body.tipoEquipamento) this.errors.push('Equipamento é obrigatório.');
        if(!this.body.formaPagamento) this.errors.push('Forma de pagamento é obrigatória.');
        if(!this.body.valor) this.errors.push('O valor é obrigatório.');
        if(!this.body.dataAluguel) this.errors.push('Data de início é obrigatória.');
        if(!this.body.terminoAluguel) this.errors.push('Data de término é obrigatória.');

        //validação das Datas
        if(this.body.dataAluguel && this.body.terminoAluguel){
            const inicio = new Date(this.body.dataAluguel);
            const fim = new Date(this.body.terminoAluguel);
            
            if(fim <= inicio) {
                this.errors.push('A data de término deve ser posterior à data do aluguel.');
            }
        }
        
        //validação do valor
        if(isNaN(this.body.valor)){
            this.errors.push('O valor deve ser um número')
        }
        if(this.body.valor <= 0){
            this.errors.push('Valor inválido')
        }
    }

    cleanUp(){

        this.body = {
            comprador: this.body.comprador,
            endereco: this.body.endereco,
            tipoEquipamento: this.body.tipoEquipamento,
            valor: parseFloat(this.body.valor),
            dataAluguel: this.body.dataAluguel,
            terminoAluguel: this.body.terminoAluguel,
            formaPagamento: this.body.formaPagamento
        }
    }
}

module.exports = Aluguel