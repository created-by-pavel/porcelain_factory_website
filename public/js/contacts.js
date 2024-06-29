let loadTl = gsap.timeline();
loadTl.from(".documents-container li", {opacity: 0, x: "50rem", duration: 1, stagger: 0.2});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const formContainer = document.getElementById("form-container");
    form.addEventListener("submit", submit);

    async function submit(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const number = document.getElementById('number').value;
        const message = document.getElementById('message').value;

        const formData = {
            name: name,
            surname: surname,
            email: email,
            number: number,
            message: message
        };

        console.log(JSON.stringify(formData));


        // formContainer.classList.add('sending');
        let response = await fetch("http://localhost:81/mail/send/contact", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (response.ok) {
             let responseJson = await response.json();
             alert(responseJson.message);
             form.reset();
        } else {
            alert("Ошибка");
        }
    }
});