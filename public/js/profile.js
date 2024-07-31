document.addEventListener("DOMContentLoaded", function() {
    const phone = document.getElementById("phone").textContent.trim();
    const surnameName = document.getElementById("surname-name").textContent.trim();
    const email = document.getElementById("email").textContent.trim();
    const popup = document.getElementById("profile-popup");
    const logoutButton = document.getElementById("log-out-button");
    const ordersButton = document.getElementById("orders-button");

    if (!phone || !surnameName || !email) {
        popup.style.display = "block";
        const form = document.querySelector("#profile-form");
        form.addEventListener("submit", submit);
    }
    logoutButton.addEventListener("click", logout)
    ordersButton.addEventListener('click', getOrders);
});

async function submit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone-popup').value;
    await validatePhone(phone);

    const email = localStorage.getItem('email');

    const formData = {
        name: name,
        surname: surname,
        phone: phone,
        email: email,
    };
        // formContainer.classList.add('sending');
        let response = await fetch("/user/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        let data = await response.json();
        if (response.status === 201) {
            window.location.reload();
        } else {
            window.alert("An error occurred: " + (data.message || "Unknown error"));
        }
}

async function logout () {
    await supertokensSession.signOut();
    window.location.href = "/";
}

async function validatePhone (phoneValue) {
    const phonePattern = /^\+7\d{10}$/;
    if (!phonePattern.test(phoneValue)) {
        window.alert('Номер телефона должен начинаться с +7 и содержать 11 цифр')
    }
}

async function getOrders () {
   window.location.href = "/orders/all"
}