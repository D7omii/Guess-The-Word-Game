// Set game name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Abdulrahman`;

// Set Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

function generateInputs() {
    const inputsContainer = document.querySelector(".inputs");
    // generate trys
    for (let i =1; i <= numberOfTries; ++i){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>${i}</span>`;
        // active one try
        if (i !== 1) tryDiv.classList.add("disabled-try");
        // generate letter inputs
        for (let j = 1; j <= numberOfLetters; ++j){
            const input = document.createElement("input");
            input.type = "text";
            input.id = `try-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }
        // append to page
        inputsContainer.appendChild(tryDiv);
    }
    // Focus on first try
    inputsContainer.children[0].children[1].focus();
    // Disable all inputs except first try
    const inputsInDisabledTry = document.querySelectorAll(".disabled-try input");
    inputsInDisabledTry.forEach((input) => (input.disabled = true));
    //
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            // Convert letters to Uppercase
            this.value = this.value.toUpperCase();
            // focus on the next input
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });
        // 
        input.addEventListener("keydown", function (event) {
            const currentIndex = Array.from(inputs).indexOf(event.target); // or this
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus();
            }
        });
    });
}

window.onload = function () {
    generateInputs();
};