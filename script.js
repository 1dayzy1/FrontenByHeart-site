
const animateOnScroll = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Разная задержка для каждой карточки (волновой эффект)
        setTimeout(() => {
          entry.target.classList.add("animate");
        }, index * 100);
      }
    });
  }, observerOptions);

  
  document
    .querySelectorAll(".card, .section h2, .hero-content, .pricing-table")
    .forEach((el) => {
      observer.observe(el);
    });
};

document.addEventListener("DOMContentLoaded", animateOnScroll);


const cert_link = document.querySelectorAll(".cert-link");
const modal = document.querySelector(".modal");
const shadow = document.querySelector(".shadow");
const img = document.querySelector(".img-certificate");
const modal_register = document.querySelector(".modal-register");

const btn_reg = document.querySelector(".btn-register");

const shadow2 = document.querySelector(".shadow2");

const btn_send = document.querySelector(".btn-register2");

const text_message = document.querySelector(".text-message")

const input_login = document.getElementById("input-login");
const input_pass = document.getElementById("input-pass");
const input_pass2 = document.getElementById("input-pass2");


btn_reg.addEventListener("click", () =>{
  modal_register.classList.add("active")
})

shadow2.addEventListener("click", () =>{
  modal_register.classList.remove("active")
})

btn_send.addEventListener("click", async() =>{
  // console.log(input_login.value, input_pass.value, input_pass2.value)
  try {
    

    if(input_pass.value !== input_pass2.value){
      text_message.textContent = "Пароли не совпадают";
      return

    }
    const req = await fetch("http://localhost:3000/api/register",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        login:input_login.value,
        password:input_pass2.value
      })
    });
    const res = await req.json();
  
    console.log(res);


    text_message.textContent = res.message

    setTimeout(() =>{
    modal_register.classList.remove("active")

    }, 1200)
    

  } catch (error) {
    console.log(error)
  }
})

const sliders = document.querySelector(".slides");


cert_link.forEach(el =>{
  el.addEventListener("click", (ev) =>{
    openModal(ev.target.dataset.value)
  })
})

shadow.addEventListener("click", () =>{
  modal.classList.remove("active")
})

const openModal = (lang) =>{
  try {

    switch(lang){
      case "fullstack":
        modal.classList.add("active");
        img.src = "./img/full.jpeg";
        break;

      case "javascript":
        modal.classList.add("active");
        img.src = "./img/mimo_js.jpeg";
        break;

      case "frontend":
        modal.classList.add("active");
        img.src = "./img/mimo_front.jpeg";
        break;   
    
      case "react":
        modal.classList.add("active");
        img.src = "./img/mimo_react.jpeg";
        break;

      case "html":
        modal.classList.add("active");
        img.src = "./img/stepik.png";
        break;




    }
    
  } catch (error) {
    console.log(error)
  }
}


const render_slider = () =>{
  const arr_path = [
    { path: "./img-avito/review1.png" },
    { path: "./img-avito/review2.png" },
    { path: "./img-avito/review3.png" },
    { path: "./img-avito/review4.png" },
    { path: "./img-avito/review5.png" },
    { path: "./img-avito/review6.png" },
    { path: "./img-avito/review7.png" },
    { path: "./img-avito/review8.png" },
    { path: "./img-avito/review9.png" },
    { path: "./img-avito/review10.png" },
    { path: "./img-avito/review11.png" },
    { path: "./img-avito/review12.png" },
    { path: "./img-avito/review13.png" },
    { path: "./img-avito/review14.png" },
    { path: "./img-avito/review15.png" },
    { path: "./img-avito/review16.png" }
  ]


  arr_path.forEach((el, index) =>{
    const slide = document.createElement("div");
    slide.classList.add("slide");

    if(index === 0){
      slide.classList.add("active");


    }



    // console.log(index);


    slide.innerHTML = `
    
                <img
                class="review-photo"
                src="${el.path}"
                alt="Фото клиента Анна"
              />
    `;

    sliders.appendChild(slide)
  })


}

render_slider();