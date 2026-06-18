import checkAuth from "./burger_menu.js";

const modal_auth = document.querySelector(".modal-auth");

const btn_auth = document.querySelector(".btn-auth");

const shadow3 = document.querySelector(".shadow3");

const btn_send_auth = document.querySelector(".btn-auth2");

const text_message2 = document.querySelector(".text-message2");

const input_login2 = document.getElementById("input-login2");
const input_pass_auth = document.getElementById("input-pass-auth");

btn_auth.addEventListener("click", () => {
  modal_auth.classList.add("active");
});

shadow3.addEventListener("click", () => {
  modal_auth.classList.remove("active");
});

btn_send_auth.addEventListener("click", async () => {
  // console.log(input_login2.value, input_pass_auth.value)
  try {
    
    const req = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        login: input_login2.value,
        password: input_pass_auth.value,
      }),
    });
    const res = await req.json();

    console.log(res);

 


    text_message2.textContent = res.message;

    if(!res.success){
      return
    }


    localStorage.setItem("user", JSON.stringify(res.user))
    localStorage.setItem("token", JSON.stringify(res.token))
    checkAuth()
    setTimeout(() => {
      modal_auth.classList.remove("active");
    }, 1200);
  } catch (error) {
    console.log(error);
  }
});
