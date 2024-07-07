document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("#login-form");
    const otpForm = document.querySelector("#otp-form");

    loginForm.addEventListener("submit", sendOTP);
    otpForm.addEventListener("submit", handleOTPInput);
});

async function sendOTP(e) {
    e.preventDefault();
    const loginPopup = document.getElementById('login-popup');
    const otpPopup = document.getElementById('otp-popup');
    const email = document.getElementById('email').value;
    try {
        let response = await fetch('https://porcelain-factory-website.onrender.com/signinup/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        let data = await response.json();

        if (response.ok && data.status === "OK") {
            localStorage.setItem('deviceId', data.deviceId);
            localStorage.setItem('preAuthSessionId', data.preAuthSessionId);
            localStorage.setItem('email', email);
            loginPopup.style.display = 'none';
            otpPopup.style.display = 'block';
        } else if (data.status === "SIGN_IN_UP_NOT_ALLOWED") {
            window.alert(data.reason);
        } else {
            window.alert("An error occurred: " + (data.message || "Unknown error"));
        }
    } catch (err) {
        window.alert("An error occurred: " + err.message);
    }
}

async function handleOTPInput(e) {
    e.preventDefault();
    const userInputCode = document.getElementById('userInputCode').value;
    const deviceId = localStorage.getItem('deviceId');
    const preAuthSessionId = localStorage.getItem('preAuthSessionId');

    if (!deviceId || !preAuthSessionId) {
        window.alert('Device ID or Pre Auth Session ID is missing');
        return;
    }

    const payload = {
        deviceId,
        preAuthSessionId,
        userInputCode
    };

    try {
        const response = await fetch("https://porcelain-factory-website.onrender.com/signinup/code/consume", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload)
        });
        let data = await response.json();

        if (response.ok && data.status === 'OK') {
            window.location.href = 'https://porcelain-factory-website.onrender.com/user/info';
        } else {
            window.alert('OTP verification failed: ' + (data.message || 'Unknown error'));
        }
    } catch (err) {
        console.error('Error:', err.message);
        window.alert('An error occurred: ' + err.message);
    }
}