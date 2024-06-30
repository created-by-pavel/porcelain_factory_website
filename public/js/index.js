let currentIndex = 0;

function changeSlide() {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    currentIndex = (currentIndex + 1) % totalSlides;
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

function closePopupOnClickOutside(e) {
    const loginPopup = document.getElementById('login-popup');
    const registerPopup = document.getElementById('register-popup');
    if (e.target === loginPopup) {
        loginPopup.style.display = 'none';
    }
    if (e.target === registerPopup) {
        registerPopup.style.display = 'none';
    }
}

function toggleMenu() {
    const menuContainer = document.getElementById('menu-container');
    const menuToggle = document.getElementById('menu-toggle');
    menuContainer.classList.toggle('active');
    menuToggle.innerHTML = menuContainer.classList.contains('active') ? '&#10006;' : '&#9776;';
}

function openLoginPopup(e) {
    e.preventDefault();
    const loginPopup = document.getElementById('login-popup');
    const menuContainer = document.getElementById('menu-container');
    const menuToggle = document.getElementById('menu-toggle');
    loginPopup.style.display = 'block';
    menuContainer.classList.remove('active');
    menuToggle.innerHTML = '&#9776;';
}

function togglePopup(e, fromPopupId, toPopupId) {
    e.preventDefault();
    document.getElementById(fromPopupId).style.display = 'none';
    document.getElementById(toPopupId).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    gsap.from(".title h1", { opacity: 0, y: "3rem", duration: 1.5 });

    const profileLink = document.getElementById('profile-link');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const popupContents = document.querySelectorAll('.popup-content');
    const arrowDown = document.querySelector('.arrow-down');
    const menuToggle = document.getElementById('menu-toggle');

    setInterval(changeSlide, 6000);

    menuToggle.addEventListener('click', toggleMenu);

    profileLink.addEventListener('click', openLoginPopup);

    window.addEventListener('click', closePopupOnClickOutside);
    window.addEventListener('touchstart', closePopupOnClickOutside);

    showRegisterLink.addEventListener('click', (e) => togglePopup(e, 'login-popup', 'register-popup'));

    showLoginLink.addEventListener('click', (e) => togglePopup(e, 'register-popup', 'login-popup'));

    popupContents.forEach(content => {
        content.addEventListener('click', (e) => e.stopPropagation());
    });

    arrowDown.addEventListener('click', () => {
        window.scrollBy({
            top: 500,
            behavior: 'smooth'
        });
    });
});