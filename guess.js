// Set game name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Abdulrahman`;

// Set Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 3;
let wordArray = [false, false, false, false, false, false];

// Manage words
let wordToGuess = "";
const words = ["Abroad","Casual","Around","Couple","Accept","Caught","Arrive","Course","Access","Centre","Artist","Covers","Across","Centum","Aspect","Create","Acting","Chance","Assess","Credit","Action","Change","Assist","Crisis","Active","Charge","Assume","Custom","Actual","Choice","Attack","Damage","Advice","Choose","Attend","Danger","Advise","Chosen","August","Dealer","Affect","Church","Author","Debate","Afford","Circle","Avenue","Decade","Afraid","Client","Backed","Decide","Agency","Closed","Barely","Defeat","Agenda","Closer","Battle","Defend","Almost","Coffee","Beauty","Define","Always","Column","Became","Degree","Amount","Combat","Become","Demand","Animal","Coming","Before","Depend","Annual","Common","Behalf","Deputy","Answer","Comply","Behind","Desert","Anyone","Copper","Belief","Design","Anyway","Corner","Belong","Desire","Appeal","Costly","Beaker","Detail","Appear","County","Better","Detect","Beyond","Budget","During","Device","Bishop","Burden","Easily","Differ","Border","Bureau","Eating","Dinner","Bottle","Button","Editor","Direct","Bottom","Camera","Effect","Doctor","Bought","Cancer","Effort","Dollar","Branch","Cactus","Eighth","Domain","Breath","Carbon","Either","Double","Bridge","Career","Eleven","Driven","Bright","Castle","Emerge","Driver"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGuess);
// Manage win or lose message
let messageArea = document.querySelector(".message");
// Manage hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", getHint);

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
            let nextInput = inputs[index + 1];
            // console.log(nextInput.disabled);
            while (nextInput.disabled) {
                ++index;
                nextInput = inputs[index + 1];
                // console.log(nextInput);
                if (index % 6 === 0) break;
            }
            if (nextInput) nextInput.focus();
        });
        // 
        input.addEventListener("keydown", function (event) {
            const currentIndex = Array.from(inputs).indexOf(event.target); // or this
            // console.log(event.key);
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus();
            }
            if (event.key === "Enter") {
                checkGuess();
            }
            if (event.key === "Backspace") {
                // const enabledInputs = document.querySelectorAll("input:not([disabled])");
                // const currentEnabledIndex = Array.from(inputs).indexOf(document.activeElement);
                // console.log(inputs[currentIndex].value);
                if (inputs[currentIndex].value !== ""){
                    inputs[currentIndex].value = "";
                    // inputs[currentIndex].focus();
                } else {
                    const prevInput = currentIndex - 1;
                    if (prevInput >= 0) {
                        inputs[prevInput].value = "";
                        inputs[prevInput].focus();
                    }
                }
            }
        });
    });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", checkGuess);

function checkGuess () {
    let endGame = false;
    let successGuess = true;
    for (let i = 1; i <= numberOfLetters; ++i) {
        const inputField = document.querySelector(`#try-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];
        // Game Logic
        if (letter === actualLetter) {
            inputField.classList.add("in-place");
            wordArray[i - 1] = true;
        } else if (wordToGuess.includes(letter) && letter !== "") {
            inputField.classList.add("not-in-place");
            successGuess = false;
        } else {
            inputField.classList.add("wrong-letter");
            successGuess = false;
        }
    }
    // Check if user win or lose
    if (successGuess) {
        messageArea.innerHTML = `<div class="box"><div class="congrat">Congratulations</div><span>🎉🎉🎉</span><div><button class="ok">OK</button><button class="retray">Play</button></div></div>`;
        // Disable all inputs
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-try"));
        guessButton.disabled = true;
        hintButton.disabled = true;
        messageArea.style.display = "block";
        endGame = true;
    } else {
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-try");
        ++currentTry;
        if (currentTry <= numberOfTries) {
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-try");
            let currentTryInputs = document.querySelectorAll(`.try-${currentTry} > input`);
            currentTryInputs.forEach((input) => (input.disabled = false));
            for (let i = 0; i < wordArray.length; ++i) {
                if (wordArray[i] === true) {
                    currentTryInputs[i].value = wordToGuess[i].toUpperCase();
                    document.querySelector(`#try-${currentTry}-letter-${i + 1}`).classList.add("in-place");
                    currentTryInputs[i].disabled = true;
                }
            }
            currentTryInputs[wordArray.indexOf(false)].focus();
        } else {
            guessButton.disabled = true;
            hintButton.disabled = true;
            messageArea.innerHTML = `<div class="box"><div class="wrong">Wrong Answer</div><span>The word is: <span>${wordToGuess}</span></span><div><button class="ok">OK</button><button class="retray">Play</button></div></div>`;
            messageArea.style.display = "block";
            endGame = true;
        }
    }
    const inputsInDisabledTry = document.querySelectorAll(".disabled-try input");
    inputsInDisabledTry.forEach((input) => (input.disabled = true));
    if (endGame) {
        const ok = document.querySelector(".ok");
        ok.addEventListener("click", closeBox);
        const retrayGame = document.querySelector(".retray");
        console.log(retrayGame);
        retrayGame.addEventListener("click", reloadGame);
    }
}

function getHint() {
    if (numberOfHints > 0) {
        --numberOfHints;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    if (numberOfHints === 0) hintButton.disabled = true;
    let currentTryInputs = document.querySelectorAll(`.try-${currentTry} > input`);
    let index = wordArray.indexOf(false);
    currentTryInputs[index].value = wordToGuess[index].toUpperCase();
    document.querySelector(`#try-${currentTry}-letter-${index + 1}`).classList.add("in-place");
    currentTryInputs[index].disabled = true;
    wordArray[index] = true;
    // if (index < numberOfLetters - 1) currentTryInputs[index + 1].focus();
    if (wordArray.indexOf(false) === -1) {
        hintButton.disabled = true;
    }
}

function closeBox () {
    messageArea.style.display = "none";
}
function reloadGame () {
    window.location.reload();
}

window.onload = function () {
    generateInputs();
};