"use strict";

const births = document.getElementById("number");
const deaths = document.getElementById("number2");
const immigrant = document.getElementById("number3");
const emigrant = document.getElementById("number4");
const population = document.getElementById("number5");
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        sessionStorage.clear();

        document.body.classList.remove("page-enter");
        document.body.classList.add("page-exit");

        setTimeout(function () {
            window.location.href = "signin.html";
        }, 500);
    });
}


function growthRate() {
    const birthRate = parseFloat(births.value);
    const deathRate = parseFloat(deaths.value);
    const immigrationRate = parseFloat(immigrant.value);
    const emigrationRate = parseFloat(emigrant.value);
    const populationSize = parseFloat(population.value);
    const result = document.getElementById("result");

    
    if (
        isNaN(birthRate) || birthRate < 0 ||
        isNaN(deathRate) || deathRate < 0 ||
        isNaN(immigrationRate) || immigrationRate < 0 ||
        isNaN(emigrationRate) || emigrationRate < 0 ||
        isNaN(populationSize) || populationSize <= 0
    ) {
        result.textContent = "Please fill in all fields with valid positive numbers.";
        result.style.color = "red";
        return;
    }

    const growth =
        (((birthRate - deathRate) +
        (immigrationRate - emigrationRate))
        / populationSize) * 100;

    result.textContent =
        `The growth rate is ${growth.toFixed(2)}%`;

    result.style.color = "green";
}



