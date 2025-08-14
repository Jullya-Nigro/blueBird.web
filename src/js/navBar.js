function OpenMenu() {
    let subMenu = document.getElementById("sub-menu-wrap");
    subMenu.classList.toggle("open-menu");
}

document.addEventListener("DOMContentLoaded", () => {
    const navLogin = document.getElementById("nav-login");
    const userJson = localStorage.getItem("user");

    if (userJson) {
        const user = JSON.parse(decodeURIComponent(userJson));

        navLogin.innerHTML = `
            <figure class="user-icon">
                <svg id="open-menu-icon" xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#e3e3e3"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>
            </figure>
            <div class = "sub-menu-wrap" id="sub-menu-wrap">
                <div class="sub-menu">
                    <div class="user-info">
                        <h3>Ola, ${user.name}</h3>
                    </div>
                    <hr>
                    <a href="profile.html" class="sub-menu-link">
                        <p>Endereços</p>
                        <span>></span>
                    </a>
                    <a href="index.html" class="sub-menu-link" id="logout-link">
                        <p>Sair</p>
                        <span>></span>
                    </a>
                </div>
            </div>`;

        const logoutLink = document.getElementById("logout-link");
        logoutLink.addEventListener("click", (event) => {
            event.preventDefault();
            Logout();
        });

        const openMenuIcon = document.getElementById("open-menu-icon");
        openMenuIcon.addEventListener("click", OpenMenu);
    } else {
        navLogin.innerHTML = `
            <a href="login.html">
                <span>Entrar</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
            </a>`;
    }
});