async function listagem() {
    console.log("Listando")
    let token = localStorage.getItem("token");
    let api = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    if (api.ok) {
        let response = await api.json();
        console.log(response);
        exibirEnderecos(response.data);
    } else {
        console.error("Erro ao buscar endereços");
    }
}

function exibirEnderecos(enderecos) {
    const listaDeEnderecos = document.getElementById("lista-de-endereco");
    listaDeEnderecos.innerHTML = "<h2>Endereços cadastrados</h2>";

    enderecos.forEach(endereco => {
        listaDeEnderecos.innerHTML += `
            <div class="endereco-item">
                <div id="tipo-endereco">
                    <h3>Tipo</h3>
                    <p>${endereco.title}</p>
                </div>
                <div id="rua-endereco">
                <h3>Rua</h3>
                <p>${endereco.address}</p>
                </div>
                <div id="numero-endereco">
                <h3>Número</h3>
                    <p>${endereco.number}</p>
                </div>
                <div id="cep-endereco">
                <h3>CEP</h3>
                    <p>${endereco.cep}</p>
                </div>
                <div id="complemento-endereco">
                <h3>Complem.</h3>
                    <p>${endereco.complement || "Nenhum"}</p>
                </div>
                <div class="icon-container-endereco">
                    <figure class="icon-endereco copiar-endereco" data-id="${endereco.id}">
                        <!-- Ícone excluir -->
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
                    </figure>
                    <a href="#" class="abrir-modal-editar icon-endereco" data-id="${endereco.id}">
                            <!-- Ícone editar -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                    </a>
                    <figure class="icon-endereco deletar-endereco" data-id="${endereco.id}">
                        <!-- Ícone excluir -->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    </figure>
                </div>
            </div>
        `;
    });
}
listagem(); 
