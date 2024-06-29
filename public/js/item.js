const cartButton = document.querySelector('#add-to-cart-button');
const popup = document.querySelector('#popup');
const productName = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');
const productImage = document.querySelector('#product-img img');
const productId = window.location.pathname.split('/').pop();

cartButton.addEventListener('click', function (e) {
    e.preventDefault();

    let newProduct = {
        id: productId,
        name: productName.textContent,
        price: parseInt(productPrice.textContent.replace(/\D/g, '')),
        imgPath: productImage.src,
        quantity: 1,
    };

    let products = JSON.parse(localStorage.getItem('products') || '[]');
    let existingProductIndex = -1;
    for (let i = 0; i < products.length; i++) {
        if (parseInt(products[i].id) === parseInt(productId)) {
            existingProductIndex = i;
            break;
        }
    }
    if (existingProductIndex !== -1) {
        products[existingProductIndex].quantity += 1;
    } else {
        products.push(newProduct);
    }
    localStorage.setItem('products', JSON.stringify(products));

    popupOpen(popup);
});

function popupOpen(currentPopup) {
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup-content')) {
            popupClose(e.target.closest('#popup'));
        }
    });
}

function popupClose(popupActive) {
    popupActive.classList.remove('open');
}