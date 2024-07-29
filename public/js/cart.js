const cartStorage = JSON.parse(localStorage.getItem('products') || '[]');
let items = document.querySelector('#items');
let popupForm = document.getElementById('popup-form');
let openButton = document.querySelector('.submit-button');
let openButton2 = document.querySelector('.left-block span');
let total = 0;

document.addEventListener('DOMContentLoaded', () => {
    drawCart();

    openButton.addEventListener('click', () => {
        popupForm.style.display = 'block';
    });

    openButton2.addEventListener('click', () => {
        popupForm.style.display = 'block';
    });

    const closePopup = (event) => {
        if (event.target === popupForm) {
            popupForm.style.display = 'none';
        }
    };

    window.addEventListener('click', closePopup);
    window.addEventListener('touchstart', closePopup);

    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData.entries());
        data.products = cartStorage.map(product => JSON.parse(product));
        data.total = total;

        fetch('/mail/send/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Форма отправлена');
                popupForm.style.display = 'none';
                localStorage.removeItem('products');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Ошибка при отправке формы');
            });
    });
});

function drawCart() {
    items.innerHTML = '';
    total = 0;
    cartStorage.forEach((product, index) => {
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `<div class="item-img"><img src=${product.imgPath}></div>
                              <div class="item-info">
                                   <div class="item-name">${product.name}</div>
                                   <div class="item-classification">${product.classification}</div>
                                     <div class="quantity-button-wrapper">
                                        <div class="quantity-button">
                                            <button class="decrement-button" data-index="${index}">-</button>
                                            <span class="number">${product.quantity}</span>
                                            <button class="increment-button" data-index="${index}">+</button>
                                        </div>
                                     </div>
                              </div>
                              <div class="item-actions">
                        <div class="delete-button" data-index="${index}">&#x2717;</div>
                        <div class="move-to-item"><a href="/products/item/${product.id}">перейти &rarr;</div>
                    </div>`;
        items.appendChild(newItem);
    });

    document.querySelectorAll('.increment-button').forEach(button => {
        button.addEventListener('click', incrementQuantity);
    });

    document.querySelectorAll('.decrement-button').forEach(button => {
        button.addEventListener('click', decrementQuantity);
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', deleteItem);
    });
}

function incrementQuantity(event) {
    const index = event.target.getAttribute('data-index');
    const numberSpan = event.target.previousElementSibling;
    let quantity = parseInt(numberSpan.textContent);
    quantity++;

    numberSpan.textContent = quantity;

    const product = JSON.parse(cartStorage[index]);
    product.quantity = quantity;
    cartStorage[index] = JSON.stringify(product);
    localStorage.setItem('products', JSON.stringify(cartStorage));
}

function decrementQuantity(event) {
    const index = event.target.getAttribute('data-index');
    const numberSpan = event.target.nextElementSibling;
    let quantity = parseInt(numberSpan.textContent);
    if (quantity > 1) {
        quantity--;

        numberSpan.textContent = quantity;

        const product = JSON.parse(cartStorage[index]);
        product.quantity = quantity;
        cartStorage[index] = JSON.stringify(product);
        localStorage.setItem('products', JSON.stringify(cartStorage));
    }
}

function deleteItem(event) {
    const index = event.target.getAttribute('data-index');
    const item = event.target.closest('.item');
    const quantity = parseInt(item.querySelector('.number').textContent);

    cartStorage.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(cartStorage));

    item.remove();

    document.querySelectorAll('.item').forEach((item, i) => {
        item.querySelector('.delete-button').setAttribute('data-index', i);
        item.querySelector('.increment-button').setAttribute('data-index', i);
        item.querySelector('.decrement-button').setAttribute('data-index', i);
    });
}
