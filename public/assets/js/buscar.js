const form = document.querySelector('.search-form')

form.addEventListener('submit', function(e) {
    e.preventDefault()
    

    const texto = document.querySelector('.input').value
    const filtro = document.querySelector('input[name="filtro"]:checked').id

    if(!texto.trim()){
        alert('1')
        return
    }

    const novaAction = `/aluguel/${filtro}/${encodeURIComponent(texto)}`

    this.action = novaAction
    this.submit()
})