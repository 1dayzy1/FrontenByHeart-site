const prev = document.querySelector(".prev")
const next = document.querySelector(".next");

const slides = document.querySelectorAll(".slide")


let currentIndex = 0;


const showSlide = (index) =>{
    slides.forEach(el =>{
        el.classList.remove('active')
    });

    slides[index].classList.add("active")
}


next.addEventListener("click", () =>{
    currentIndex++;

    if(currentIndex >= slides.length){
        currentIndex = 0
    }
    showSlide(currentIndex)
})

prev.addEventListener("click", () =>{
    currentIndex--;

    if(currentIndex < 0){
        currentIndex = slides.length - 1;
    }
    showSlide(currentIndex)

})