const login = document.querySelector(".login");
const btn_logout = document.querySelector(".logout");
const user = JSON.parse(localStorage.getItem("user")) || ' ';


login.textContent = user.login;

btn_logout.addEventListener("click", () =>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/index.html"

})