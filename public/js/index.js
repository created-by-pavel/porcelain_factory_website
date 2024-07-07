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
    if (e.target === loginPopup) {
        loginPopup.style.display = 'none';
    }
    if (e.target === otpPopup) {
        otpPopup.style.display = 'none';
    }
}

function toggleMenu() {
    const menuContainer = document.getElementById('menu-container');
    const menuToggle = document.getElementById('menu-toggle');
    menuContainer.classList.toggle('active');
    menuToggle.innerHTML = menuContainer.classList.contains('active') ? '&#10006;' : '&#9776;';
}

function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    const menuContainer = document.getElementById('menu-container');
    const menuToggle = document.getElementById('menu-toggle');
    popup.style.display = 'block';
    menuContainer.classList.remove('active');
    menuToggle.innerHTML = '&#9776;';
}

async function isAuthenticated() {
    return localStorage.getItem('deviceId') != null && localStorage.getItem('preAuthSessionId') != null;
}

async function chooseAction(e) {
    if (await supertokensSession.doesSessionExist()) {
        window.location.href = 'https://porcelain-factory-website.onrender.com/user/info';
    } else {
        openPopup('login-popup', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    gsap.from(".title h1", { opacity: 0, y: "3rem", duration: 1.5 });

    const profileLink = document.getElementById('profile-link');
    const arrowDown = document.querySelector('.arrow-down');
    const menuToggle = document.getElementById('menu-toggle');

    setInterval(changeSlide, 6000);

    menuToggle.addEventListener('click', toggleMenu);

    profileLink.addEventListener('click', chooseAction);

    window.addEventListener('click', closePopupOnClickOutside);
    window.addEventListener('touchstart', closePopupOnClickOutside);

    arrowDown.addEventListener('click', () => {
        window.scrollBy({
            top: 500,
            behavior: 'smooth'
        });
    });
});