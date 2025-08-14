const form = document.getElementById('Form');

const nameInput = document.getElementById("name-input")
const birthdayInput = document.getElementById("birthday-input")
const cpf_cnpjInput = document.getElementById("cpf_cnpj-input")
const termsInput = document.getElementById("terms-input")
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');

const error_message = document.getElementById('error-message');

const allInputs = [emailInput, passwordInput, nameInput, birthdayInput, cpf_cnpjInput, termsInput].filter(input => input !== null);
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorreto')) {
            input.parentElement.classList.remove('incorreto');
            error_message.innerText = '';
        }
    })
})

if(form){
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let response = {
            'status': 200
        };
        let erros = [];
        
        if (nameInput) {
            erros = coletarCadastroFormErros(emailInput.value, passwordInput.value, nameInput.value, birthdayInput.value, cpf_cnpjInput.value, termsInput.checked);
            if (erros.length === 0){
                response = await Register(nameInput.value, birthdayInput.value, emailInput.value, cpf_cnpjInput.value, passwordInput.value);
                console.log(response.message)
                erros = coletarApiErros(response);
            }
        } else {
            erros = coletarLoginFormErros(emailInput.value, passwordInput.value);
            if (erros.length === 0){
                response = await Login(emailInput.value, passwordInput.value);
                console.log(response.message)
                erros = coletarLoginApiErros(response);
            }
        }

        if (erros.length > 0) {
            error_message.innerText = erros.join(' ');
        }
        else{
            location.replace("index.html")

            if(response && response.status === 200){
                const result = response.message;
                
                localStorage.setItem("token", result.access_token)
                localStorage.setItem("token_type", result.token_type)
                localStorage.setItem("expires_in", result.expires_in)
                localStorage.setItem("user", JSON.stringify(result.user))
            }
        }
    });
}

function coletarLoginFormErros(email, senha) {
    let erros = [];

    if (!/\S+@\S+\.\S+/.test(email)) {
        erros.push('Por favor, insira um endereço de e-mail válido');
        emailInput.parentElement.classList.add('incorreto');
    }

    if (senha.length < 6) {
        erros.push('A senha deve ter pelo menos 6 caracteres');
        passwordInput.parentElement.classList.add('incorreto');
    }

    return erros;
}

function coletarLoginApiErros(response) {
    let erros = [];

    if (response.status === 401) {
        const apiErrors = response.message.data.errors;

        erros.push(apiErrors);
    }

    error_message.innerText = erros.join('. ');

    return erros;
}

function coletarApiErros(response) {
    let erros = [];

    if (response.status === 422) {
        const apiErrors = response.message.data.errors;

        for (const [field, messages] of Object.entries(apiErrors)) {
            const inputElement = document.getElementById(`${field}-input`);
            if (inputElement) {
                inputElement.parentElement.classList.add('incorreto');
            }
            erros.push(...messages);
        }

        error_message.innerText = erros.join('. ');
    }

    return erros;
}

function coletarCadastroFormErros(email, senha, nome, aniversario, cpf_cnpj, termos) {
    let erros = [];
    if (aniversario === '') {
        erros.push('A data de aniversário é obrigatória');
        birthdayInput.parentElement.classList.add('incorreto');
    }
    
    if (cpf_cnpj === '') {
        erros.push('O CPF ou CNPJ é obrigatório');
        cpf_cnpjInput.parentElement.classList.add('incorreto');
    }
    
    console.log(termos)
    if (!termos) {
        erros.push('O termo é obrigatório');
        termsInput.parentElement.classList.add('incorreto');
    }
    
    if (nome === '') {
        erros.push('O nome é obrigatório');
        nameInput.parentElement.classList.add('incorreto');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        erros.push('Por favor, insira um endereço de e-mail válido');
        emailInput.parentElement.classList.add('incorreto');
    }

    if (senha.length < 6) {
        erros.push('A senha deve ter pelo menos 6 caracteres');
        passwordInput.parentElement.classList.add('incorreto');
    }

    return erros;
}

const enderecoforms = document.getElementById("form-endereco")
const titulo = document.getElementById("titulo")
const cep = document.getElementById("cep")
const rua = document.getElementById("rua")
const numero  = document.getElementById("numero")
if (enderecoforms) {
    enderecoforms.addEventListener('submit', async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // Certifique-se de que esse token está no localStorage

        await cadastrar(
            titulo.value,
            cep.value,
            rua.value,
            numero.value,
        );
    });
}
