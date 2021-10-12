const body = document.querySelector("body");
const scoreNode = document.querySelector(".scores");
const userScoreNode = document.querySelector(".user-score");
const compScoreNode = document.querySelector(".comp-score");
const choices = document.querySelector(".choices");
const gameComments = document.querySelector(".game-comments");
const backgroundMusic = document.querySelector(".bg-music");
const muteButton = document.querySelector(".mute");
const muteImg = document.querySelector(".mute img");
const resetButton = document.querySelector(".reset");
const buttons = Array.from(document.querySelectorAll(".choices > button"));

let scores = {"user": 0, "comp": 0};

muteButton.addEventListener("click", () => {
    console.log(backgroundMusic.volume)
    if (backgroundMusic.volume === 1) {
        muteImg.src = "images/volume-xmark-solid.svg";
        backgroundMusic.volume = 0;
    } else if (backgroundMusic.volume === 0) {
        muteImg.src = "images/volume-high-solid.svg";
        backgroundMusic.volume = 1;
    }
});

resetButton.addEventListener("click", resetGame);
buttons.forEach(button => button.addEventListener("click", playRound));

function playRound(event) {
    let userChoice = event.target.className;
    let compChoice = getCompChoice();

    let winner = getWinner(userChoice, compChoice);

    buttons.forEach(button => button.disabled = true);
    setTimeout(() => {
        buttons.forEach(button => button.disabled = false);
        updateWinnerScore(winner, scores);
        showRoundResults(winner, userChoice, compChoice);
        checkIfGameEnded();
    }, 2000);
}

function getCompChoice() {
    let randomNum = Math.floor(Math.random() * 3);
    switch (randomNum) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function getWinner(player1, player2) {
    // 0 - playerOne | 1 - playerTwo | 2 - tie 
    let state = player1 + " " + player2;
    switch (state) {
        case "rock rock":
            return 2;
        case "rock paper":
            return 1;
        case "rock scissors":
            return 0;
        case "paper rock":
            return 0;
        case "paper paper":
            return 2;
        case "paper scissors":
            return 1;
        case "scissors rock":
            return 1;
        case "scissors paper":
            return 0;
        case "scissors scissors":
            return 2;
        default:
            return null;
    }
}

function updateWinnerScore(winner, scores) {

    switch(winner) {
        case 0:
            scores["user"]++;
            userScoreNode.textContent = scores["user"];
            break;
        case 1:
            scores["comp"]++;
            compScoreNode.textContent = scores["comp"]
            break;
        default:
            return;
    }
}

function showRoundResults(winner, userChoice, compChoice) {
    switch(winner) {
        case 0:
            gameComments.textContent = `You win! ${userChoice} beats ${compChoice}.`;
            break;
        case 1: 
            gameComments.textContent = `You lose... ${userChoice} loses to ${compChoice}.`;
            break;
        case 2:
            gameComments.textContent = "It's a tie."
            break;
    }
}

function checkIfGameEnded() {
    if (scores["user"] >= 5 || scores["comp"] >= 5) {
        hideGame();
        showGameResult();
        showResetButton();
    }
}

function hideGame(){
    scoreNode.setAttribute("style", "display: none;");
    choices.setAttribute("style", "display: none;");
}

function showGame() {
    scoreNode.setAttribute("style", "display: flex;");
    choices.setAttribute("style", "display: flex;");
}

function showGameResult() {
    if (scores["user"] > scores["comp"]) {
        gameComments.textContent = "You Win The Game!";
    } else {
        gameComments.textContent = "You Lose to Computer...";
    }
}

function showResetButton() {
    resetButton.setAttribute('style', 'display: block');
}

function hideResetButton() {
    resetButton.setAttribute('style', 'display: none');
}

function resetGame() {
    resetScore();
    hideResetButton();
    gameComments.textContent = "pick an option";
    showGame();
}

function resetScore(){
    scores = {"user": 0, "comp": 0};
    userScoreNode.textContent = "0";
    compScoreNode.textContent = "0";
}

