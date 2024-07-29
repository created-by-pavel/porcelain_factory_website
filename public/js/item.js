document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.querySelector('#add-to-cart-button');
    const quantityPopup = document.querySelector('#quantity-popup');
    const productName = document.querySelector('#product-name');
    const quantityButton = document.querySelector('#quantity-button');
    const successPopup = document.querySelector('#success-popup');
    const productClassification = document.querySelector('#product-classification');
    const productImage = document.querySelector('#product-img img');
    const productId = window.location.pathname.split('/').pop();
    const quantityInput = document.querySelector('.form-group input');

    if (productName && quantityInput.placeholder) {
        if (productName.textContent.trim() === 'ТРУБКИ МКР') {
            quantityInput.placeholder = 'в погонных метрах';
        }
    }

    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        popupOpen(quantityPopup);
    });

    quantityButton.addEventListener('click', function(e) {
        e.preventDefault();
        const quantity = parseInt(quantityInput.value);

        if (!quantity || quantity <= 0) {
            alert('Введите корректное количество');
            return;
        }

        const newProduct = {
            id: productId,
            name: productName.textContent.trim(),
            classification: productClassification.textContent.trim(),
            imgPath: productImage.src,
            quantity: quantity
        };

        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const existingProductIndex = products.findIndex(product => product.id === productId);

        if (existingProductIndex !== -1) {
            products[existingProductIndex].quantity += quantity;
        } else {
            products.push(newProduct);
        }

        localStorage.setItem('products', JSON.stringify(products));

        popupClose(quantityPopup);
        popupOpen(successPopup);
    });

    function popupOpen(currentPopup) {
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function(e) {
            if (!e.target.closest('.popup-content')) {
                popupClose(currentPopup);
            }
        });
    }

    function popupClose(popupActive) {
        popupActive.classList.remove('open');
    }
});