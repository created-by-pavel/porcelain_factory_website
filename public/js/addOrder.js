document.addEventListener('DOMContentLoaded', () => {
    const popupForm = document.getElementById('popup-form');
    const openButtons = document.querySelectorAll('.submit-button, .left-block span');
    const orderForm = document.getElementById('order-form');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    console.log(products);

    const togglePopupForm = (display) => {
        popupForm.style.display = display;
    };

    openButtons.forEach(button => {
        button.addEventListener('click', () => togglePopupForm('block'));
    });

    const closePopup = (event) => {
        if (event.target === popupForm) {
            togglePopupForm('none');
        }
    };

    window.addEventListener('click', closePopup);
    window.addEventListener('touchstart', closePopup);

    const sendRequest = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Request error:', error);
            throw error;
        }
    };

    orderForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData.entries());
        data.totalCost = total;
        let orderId = -1;

        try {
            data.products = products.map(product => +product.id);
            const orderResult = await sendRequest('/orders/create', data);
            orderId = orderResult.id;
            console.log('Order created');

            data.products = products;
            const mailResult = await sendRequest('/mail/send/order', data);
            console.log('Mail sent');
            alert('Заказ ушел вам на почту');
            togglePopupForm('none');
            localStorage.removeItem('products');
        } catch (error) {
            alert('Ошибка при создании заказа');
        }

        if (await supertokensSession.doesSessionExist()) {
            const connectResult = await sendRequest(`/orders/connect/${orderId}`, {});
            console.log('Connection success:', connectResult);
        }
    });
});


// цена, totalcost