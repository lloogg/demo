let index = 0;
showSlide(index);

function plusSlides(n) {
    showSlide(index += n);
}

function showSlide(n) {
    let slides = document.getElementsByClassName("slide");
    if (n === slides.length) {
        index = 0;
    }
    if (n === -1) {
        index = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[index].style.display = "block";
}