document.addEventListener("click", async (e) => {
    if (e.target.closest(".deletar-endereco")) {
        const id = e.target.closest(".deletar-endereco").getAttribute("data-id");
        if (confirm("Tem certeza que deseja deletar este endereço?")) {
            await deletar(id);
            listagem(); 
        }
    }
    else if(e.target.closest(".copiar-endereco")){
        const id = e.target.closest(".copiar-endereco").getAttribute("data-id");
        if (confirm("Tem certeza que deseja copiar este endereço?")) {
            await copiar(id);
            listagem(); 
        }
    }
});

async function copiar(id) {
    console.log("Copiando");
    const endereco = await coletarDetalhes(id);

    console.log("Aqui esta os detahes");
    console.log(endereco);

    await cadastrar(endereco.title, endereco.cep, endereco.address, endereco.number, endereco.complement);

    console.log("Cadastrado novamente");
}

async function deletar(id) {
    const token = localStorage.getItem("token");

    const resposta = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!resposta.ok) {
        console.error("Erro ao deletar endereço:", await resposta.text());
    } else {
        console.log("Endereço deletado com sucesso.");
    }
}
