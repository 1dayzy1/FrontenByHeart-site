const burger_btn = document.querySelector(".burger-btn");
const menu = document.querySelector(".menu");
const mobileAuthBlock = document.getElementById("mobileAuthBlock")
const profile_icon = document.querySelector(".profile-icon");
const login = document.querySelector(".login")
const info_profile = document.querySelector(".info-profile")
burger_btn.addEventListener("click", () =>{
  burger_btn.classList.toggle("active")

  menu.classList.toggle("active")


})


const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user")) || ''


const checkAuth = () =>{
  if(token){
    profile_icon.classList.add('active');
    mobileAuthBlock.classList.add('auth');
    info_profile.classList.add("auth");
    login.textContent = user.login

  
  }else{
    profile_icon.classList.remove('active');
    mobileAuthBlock.classList.remove('auth');
    info_profile.classList.remove("auth")


  }
}

checkAuth()

export default checkAuth