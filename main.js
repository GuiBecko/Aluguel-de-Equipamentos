const _equipamento = Symbol('')
const _alugador = Symbol('')
const _quantidade = Symbol('')

class Aluguel {
    constructor(equipamento, alugador, quantidade){
        this[_equipamento] = equipamento
        this[_alugador] = alugador
        this[_quantidade] = quantidade
    }
    get equipamento(){
        return this[_equipamento]
    }
    get alugador(){
        return this[_alugador]
    }
    get quantidade(){
        return this[_quantidade]
    }
}

let alugueis = []



const form = document.querySelector('#form')
const inputNomeEquipamento = document.getElementById('nome-equipamento')
const inputNomeAlugador = document.getElementById('nome-alugador')
const inputQuantidade = document.getElementById('quantidade')


form.addEventListener('submit', function(event){
    event.preventDefault()
    const equipamento = inputNomeEquipamento.value
    const alugador = inputNomeAlugador.value
    const quantidade = inputQuantidade.value


    const aluguel = new Aluguel(equipamento, alugador, quantidade)
    alugueis.push(aluguel)
    form.reset()
    
    mostrarAlugueis();
})
const alugueisSection = document.querySelector('.alugueis')
function mostrarAlugueis(){
    alugueisSection.innerHTML = ''

    for(let aluguel of alugueis){
        alugueisSection.innerHTML += 
        `<div class='aluguel-card'>
         <p class='equipamento'>${aluguel.equipamento}</p> 
         <p class='alugador'>${aluguel.alugador}</p>
         <p class='quantidade'>${aluguel.quantidade}</p>
         </div>`
    }
}


