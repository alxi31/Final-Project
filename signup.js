"use strict";

const signupForm = document.getElementById("signupForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const result = document.getElementById("result");

window.addEventListener("DOMContentLoaded", function () {
    requestAnimationFrame(function () {
        document.body.classList.add("page-enter");
    });
});

/* Show dan Hide password */
document.querySelectorAll(".show-password").forEach(function (button) {
    button.addEventListener("click", function () {
        const input = document.getElementById(
            button.dataset.target
        );

        if (!input) {
            return;
        }

        const isHidden = input.type === "password";

        input.type = isHidden ? "text" : "password";
        button.textContent = isHidden ? "Hide" : "Show";
    });
});

/* Proses Sign Up */
signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value
        .trim()
        .toLowerCase();

    const email = emailInput.value
        .trim()
        .toLowerCase();

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!username || !email || !password || !confirmPassword) {
        tampilkanPesan(
            "Semua kolom harus diisi.",
            "red"
        );
        return;
    }

    if (username.length < 4) {
        tampilkanPesan(
            "Username minimal 4 karakter.",
            "red"
        );
        return;
    }

    if (username.includes(" ")) {
        tampilkanPesan(
            "Username tidak boleh mengandung spasi.",
            "red"
        );
        return;
    }

    const usernamePattern = /^[a-z0-9_]+$/;

    if (!usernamePattern.test(username)) {
        tampilkanPesan(
            "Username hanya boleh berisi huruf, angka, dan underscore.",
            "red"
        );
        return;
    }

    if (!emailInput.validity.valid) {
        tampilkanPesan(
            "Format email tidak valid.",
            "red"
        );
        return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        tampilkanPesan(
            "Password harus memiliki minimal 8 karakter, satu huruf besar, satu angka, dan satu karakter khusus.",
            "red"
        );
        return;
    }

    if (password !== confirmPassword) {
        tampilkanPesan(
            "Konfirmasi password tidak sama.",
            "red"
        );
        return;
    }

    const savedAccount = getSavedAccount();

    if (
        savedAccount &&
        savedAccount.username &&
        savedAccount.username.toLowerCase() === username
    ) {
        tampilkanPesan(
            "Username sudah digunakan.",
            "red"
        );
        return;
    }

    if (
        savedAccount &&
        savedAccount.email &&
        savedAccount.email.toLowerCase() === email
    ) {
        tampilkanPesan(
            "Email sudah terdaftar.",
            "red"
        );
        return;
    }

    const account = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem(
        "account",
        JSON.stringify(account)
    );

    tampilkanPesan(
        "Registrasi berhasil! Menuju halaman login...",
        "green"
    );

    signupForm.reset();

    setTimeout(function () {
        pindahHalaman("signin.html");
    }, 700);
});

document.querySelectorAll(".page-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        pindahHalaman(link.href);
    });
});

function getSavedAccount() {
    try {
        return JSON.parse(
            localStorage.getItem("account")
        );
    } catch (error) {
        localStorage.removeItem("account");
        return null;
    }
}

function tampilkanPesan(pesan, warna) {
    result.textContent = pesan;
    result.style.color = warna;
}

function pindahHalaman(url) {
    document.body.classList.remove("page-enter");
    document.body.classList.add("page-exit");

    setTimeout(function () {
        window.location.href = "signin.html";
    }, 500);
}