// Seleccionar todos los carruseles
const carousels = document.querySelectorAll('.carousel');

// Función para mostrar la imagen anterior
function showPrevImg(carousel) {
    const imgs = carousel.querySelectorAll('img');
    const activeImg = carousel.querySelector('.active');
    const prevImg = activeImg.previousElementSibling || imgs[imgs.length - 1];

    activeImg.classList.remove('active');
    prevImg.classList.add('active');
}

// Función para mostrar la imagen siguiente
function showNextImg(carousel) {
    const imgs = carousel.querySelectorAll('img');
    const activeImg = carousel.querySelector('.active');
    const nextImg = activeImg.nextElementSibling || imgs[0];

    activeImg.classList.remove('active');
    nextImg.classList.add('active');
}

// Agregar eventos a los botones de navegación
carousels.forEach(carousel => {
    const prevBtn = carousel.querySelector('.carousel-control-prev');
    const nextBtn = carousel.querySelector('.carousel-control-next');

    prevBtn.addEventListener('click', () => showPrevImg(carousel));
    nextBtn.addEventListener('click', () => showNextImg(carousel));
});