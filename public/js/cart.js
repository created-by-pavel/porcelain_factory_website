const cartStorage = JSON.parse(localStorage.getItem('products') || '[]');
let items = document.querySelector('#items');

document.addEventListener('DOMContentLoaded', () => {
    drawCart();
});

function drawCart() {
    items.innerHTML = '';
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

    cartStorage[index].quantity = quantity;
    localStorage.setItem('products', JSON.stringify(cartStorage));
}

function decrementQuantity(event) {
    const index = event.target.getAttribute('data-index');
    const numberSpan = event.target.nextElementSibling;
    let quantity = parseInt(numberSpan.textContent);
    if (quantity > 1) {
        quantity--;

        numberSpan.textContent = quantity;

        cartStorage[index].quantity = quantity;
        localStorage.setItem('products', JSON.stringify(cartStorage));
    }
}

function deleteItem(event) {
    const index = event.target.getAttribute('data-index');
    cartStorage.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(cartStorage));

    drawCart();
}