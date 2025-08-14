document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.getElementById("titulo");  
    const cep = document.getElementById("cep");
    const rua = document.getElementById("rua");
    const numero = document.getElementById("numero");
    const complemento = document.getElementById("complemento");
    const cadastrarEnderecoBotao = document.getElementById("adicionar-endereco-link");

    cadastrarEnderecoBotao.addEventListener("click", async (e) => {
        e.preventDefault();

        await cadastrar(
            titulo.value.trim(),
            cep.value.trim(),
            rua.value.trim(),
            numero.value.trim(),
            complemento.value.trim() || "" 
        );

        titulo.value = "";
        cep.value = "";
        rua.value = "";
        numero.value = "";
        complemento.value = "";
    });
});

async function cadastrar(titulo, cep, rua, numero, complemento) {
    const endereco = {
        "title": titulo,
        "cep": cep,
        "address": rua,
        "number": numero,
        "complement": complemento || ""  
    };

    console.log("Enviando para a API:", endereco); 

    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token não encontrado. Certifique-se de que o usuário está autenticado.");
        return;
    }

    const resposta = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(endereco)
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        console.error("Erro ao cadastrar endereço:", erro);
        return;
    }

    console.log("Endereço cadastrado com sucesso!");
    await listagem();  
}
