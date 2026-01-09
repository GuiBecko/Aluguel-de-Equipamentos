class Header extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <div class="header">
        <h2>Aluguel de equipamento</h2>

        <a href="/login/index">Login | Registro</a>
        </div>
        `
    }
}
customElements.define('c-header', Header)