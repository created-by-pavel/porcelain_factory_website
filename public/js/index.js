
let loadTl = gsap.timeline();
loadTl.from(".title h1", {opacity: 0, y: "3rem", duration: 1});

let currentIndex = 0;

function changeSlide() {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    currentIndex = (currentIndex + 1) % totalSlides;
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    const profileLink = document.getElementById('profile-link');
    const loginPopup = document.getElementById('login-popup');
    const registerPopup = document.getElementById('register-popup');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const popupContents = document.querySelectorAll('.popup-content');
    const menuToggle = document.getElementById('menu-toggle');
    const menuContainer = document.getElementById('menu-container');

    setInterval(changeSlide, 6000);

    menuToggle.addEventListener('click', function () {
        menuContainer.classList.toggle('active');
        if (menuToggle.innerHTML === '☰') {
            menuToggle.innerHTML = '&#10006;';
        } else {
            menuToggle.innerHTML = '☰';
        }
    });

    profileLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginPopup.style.display = 'block';
        menuContainer.classList.remove('active');
        // Ensure the menuToggle button content is reset
        menuToggle.innerHTML = '☰';
    });

    window.addEventListener('click', (e) => {
        if (e.target == loginPopup) {
            loginPopup.style.display = 'none';
        }
        if (e.target == registerPopup) {
            registerPopup.style.display = 'none';
        }
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginPopup.style.display = 'none';
        registerPopup.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerPopup.style.display = 'none';
        loginPopup.style.display = 'block';
    });

    popupContents.forEach(content => {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});

const arrowDown = document.querySelector('.arrow-down');
arrowDown.addEventListener('click', function() {
    window.scrollBy({
        top: 500,
        behavior: 'smooth'
    });
});