"use strict";

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const showPasswordButton =
    document.getElementById("showPassword");
const result = document.getElementById("result");

window.addEventListener("DOMContentLoaded", function () {
    requestAnimationFrame(function () {
        document.body.classList.add("page-enter");
    });

    const savedAccount = getSavedAccount();

    if (savedAccount && savedAccount.username) {
        usernameInput.value = savedAccount.username;
    }
});

/* Show dan Hide password */
showPasswordButton.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden
        ? "text"
        : "password";

    showPasswordButton.textContent = isHidden
        ? "Hide"
        : "Show";
});

/* Proses Login */
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value
        .trim()
        .toLowerCase();

    const password = passwordInput.value;

    if (!username || !password) {
        showMessage(
            "Username dan password harus diisi.",
            "red"
        );
        return;
    }

    const savedAccount = getSavedAccount();

    if (!savedAccount) {
        showMessage(
            "Akun tidak ditemukan. Silakan Sign Up.",
            "red"
        );
        return;
    }

    if (
        !savedAccount.username ||
        !savedAccount.password
    ) {
        localStorage.removeItem("account");

        showMessage(
            "Data akun lama telah dihapus. Silakan Sign Up ulang.",
            "red"
        );
        return;
    }

    const savedUsername = savedAccount.username
        .trim()
        .toLowerCase();

    if (
        username !== savedUsername ||
        password !== savedAccount.password
    ) {
        showMessage(
            "Username atau password salah.",
            "red"
        );
        return;
    }

    sessionStorage.setItem(
        "isLoggedIn",
        "true"
    );

    sessionStorage.setItem(
        "loggedInUsername",
        savedAccount.username
    );

    showMessage(
        "Login berhasil! Mengalihkan halaman...",
        "green"
    );

    setTimeout(function () {
        pindahHalaman("website.html");
    }, 600);
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

function showMessage(message, color) {
    result.textContent = message;
    result.style.color = color;
}

function pindahHalaman(url) {
    document.body.classList.remove("page-enter");
    document.body.classList.add("page-exit");

    setTimeout(function () {
        window.location.href = url;
    }, 500);
}