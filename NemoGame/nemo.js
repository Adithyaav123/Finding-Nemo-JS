let nemoImage = document.querySelector(".nemo-image");
let messageElement = document.querySelector("#message");

let attempts = 0;
let gameActive = true;


function shuffleArrayRandomly(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function initializeNewGame() {
    
    const circles = document.querySelectorAll(".circle");
    const circleArray = Array.from(circles);
     shuffleArrayRandomly(circleArray);

    
    circleArray.forEach(circle => {
        circle.classList.remove("nemo");
    });

    
    const randomIndex = Math.floor(Math.random() * circleArray.length);
    circleArray[randomIndex].classList.add("nemo");

    
    attempts = 0;
    gameActive = true;

    
    circleArray.forEach(circle => {
        circle.addEventListener('click', circleClickHandler);
        
        circle.style.backgroundColor = 'blue'; 
    });
 
    nemoImage.style.display = "none";
    messageElement.textContent = "";
}

function handleGameResult(isWinner) {
    gameActive = false;
    if (isWinner) {
        const nemoCircle = document.querySelector(".nemo");
        nemoCircle.style.backgroundImage =`url("nemo.png")`;
        nemoCircle.style.backgroundSize = "cover";
        messageElement.textContent = `Congratulations! You found Nemo in ${attempts} attempts!`;
    } else {
        messageElement.textContent = "Sorry, you lose!";
    }

   
    document.querySelectorAll(".circle").forEach(circle => {
        circle.removeEventListener('click', circleClickHandler);
    });
}


function circleClickHandler() {
    attempts++;

    if (this.classList.contains("nemo")) {
        handleGameResult(true);
    } else if (attempts > 6) {
        handleGameResult(false);
    } else {
       
        this.style.backgroundColor = 'red'; 
        messageElement.textContent="Sorry, keep looking for Nemo!";

        const remainingAttempts = 6 - attempts;
       
        messageElement.textContent += `Attempts remaining: ${remainingAttempts}`;
    }
}

initializeNewGame();