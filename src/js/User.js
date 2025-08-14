const baseUrl = 'https://go-wash-api.onrender.com/api';

// Usuario teste
// peregrina7740@uorak.com
// 123456

async function Login(email, password){
    let userLogin =  {
        "email": email,
        "password": password,
        "user_type_id": 1
    }

    const headers = {
        'Content-Type': 'application/json'
    }

    const response = await fetch(baseUrl + '/login',{
        method: "POST",
        headers: headers,
        body: JSON.stringify(userLogin)
    });
    
    let result = await response.json()
    
    return {
        url: baseUrl + '/login',
        status: response.status,
        message: result
    }
}
async function Register(name, birthday, email, cpf_cnpj, password){
    let userRegistration =  {
        "name": name,
        "email": email,
        "user_type_id": 1,
        "password": password,
        "cpf_cnpj": cpf_cnpj,
        "terms": 1,
        "birthday": birthday
    }

    const response = await fetch(baseUrl + '/user', {
        method: "POST",
        body: JSON.stringify(userRegistration),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    let result = await response.json()
    
    return {
        url: baseUrl + '/user',
        status: response.status,
        message: result
    }
}

async function Logout(){
    try{
        localStorage.removeItem("token")
        localStorage.removeItem("token_type")
        localStorage.removeItem("expires_in")
        localStorage.removeItem("user")
        
        location.replace("index.html")

        const response = await fetch(baseUrl + '/logout', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
        
        if(!response.ok) {
        }
        
        return {
            url: baseUrl + '/logout',
            status: response.status,
            message: "logout realizado com sucesso"
        }
    }
    catch(error){
        console.error("Error during logout:", error);
        
        return {
            status: 500,
            message: "Erro no logout"
        }
    }
}