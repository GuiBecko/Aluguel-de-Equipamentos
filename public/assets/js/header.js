class Header extends HTMLElement {
    connectedCallback(){

        let logado = this.getAttribute('logado')

        if(logado === 'true'){logado = true}
        else{logado = false}

        if(logado){
            this.innerHTML = `
            <div class="header">
                <h2>Rent-Flow</h2>
                <a href="/login/logout">Sair</a>            
            </div>`
        } else {
        this.innerHTML = `
            <div class="header">
                <h2>Rent-Flow</h2>
                <a href="/login/index">Login | Registro</a>
            </div>`
        }
    }
}
customElements.define('c-header', Header)