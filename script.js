
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
const img = document.querySelector(".img-certificate")


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