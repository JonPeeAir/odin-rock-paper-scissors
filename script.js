const userScoreNode = document.querySelector(".user-score");
const compScoreNode = document.querySelector(".comp-score");
const backgroundMusic = document.querySelector(".bg-music");
const muteButton = document.querySelector(".mute");
const muteImg = document.querySelector(".mute img");
const gameComments = document.querySelector(".game-comments");
const userHand = document.querySelector(".user-hand");
const userHandImg = document.querySelector(".user-hand img");
const compHand = document. querySelector(".comp-hand");
const compHandImg = document.querySelector(".comp-hand img");
const choices = document.querySelector(".choices");
const resetButton = document.querySelector(".reset");
const buttons = Array.from(document.querySelectorAll(".choices > button"));

document.addEventListener("click", () => backgroundMusic.play());
muteButton.onclick = toggleMusicVolume;
resetButton.onclick = resetGame;
buttons.forEach(button => button.onclick = playRound);
let scores = {"user": 0, "comp": 0};

function toggleMusicVolume() {
    if (backgroundMusic.muted === true) {
        muteImg.src = "images/volume-high-solid.svg";
        backgroundMusic.muted = false;
    } else if (backgroundMusic.muted === false) {
        muteImg.src = "images/volume-xmark-solid.svg";
        backgroundMusic.muted = true;
    }
}

function resetGame() {
    resetScore();
    hideResetButton();
    gameComments.textContent = "pick an option";
    userHandImg.setAttribute("src", "images/player-hands/rock-left.svg");
    compHandImg.setAttribute("src", "images/player-hands/rock-right.svg");
    showGame();
}

function resetScore(){
    scores = {"user": 0, "comp": 0};
    userScoreNode.textContent = "0";
    compScoreNode.textContent = "0";
}

function showResetButton() {
    resetButton.setAttribute('style', 'display: block;');
}

function hideResetButton() {
    resetButton.setAttribute('style', 'display: none');
}

function showGame() {
    choices.setAttribute("style", "display: flex;");
}

function hideGame(){
    choices.setAttribute("style", "display: none;");
}

function playRound(event) {
    // Ensure player hands start with rock
    userHandImg.setAttribute("src", "images/player-hands/rock-left.svg");
    compHandImg.setAttribute("src", "images/player-hands/rock-right.svg");

    disableChoices();

    let userChoice = event.target.id;
    let compChoice = getCompChoice();

    let winner = getWinner(userChoice, compChoice);

    let currentButton = getButtonNode(event);
    currentButton.setAttribute("style", "bottom: 10px; animation: wave 3.5s forwards;")

    // Animate current round
    userHand.setAttribute("style", "animation: user-hand-animation 0.7s ease-in-out 4");
    compHand.setAttribute("style", "animation: comp-hand-animation 0.7s ease-in-out 4");

    setTimeout(() => {
        removeAnimations(currentButton);
        displayPlayerChoices(userChoice, compChoice)
        enableChoices();
        updateWinnerScore(winner, scores);
        showRoundResults(winner, userChoice, compChoice);
        checkIfGameEnded();
    }, 2700);
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

function getButtonNode(event) {
    /*  
        Made this function because sometimes clicking on
        a button node targets the image in the node instead
        of the button itself
        
        we usually want the button node
    */
    if (event.target.nodeName === "IMG") {
        return event.path[1];
    } else {
        return event.target;
    }
}

function removeAnimations(currentButton) {
    currentButton.removeAttribute("style");
    userHand.removeAttribute("style");
    compHand.removeAttribute("style")
}

function displayPlayerChoices(userChoice, compChoice) {
    userHandImg.setAttribute("src", `images/player-hands/${userChoice}-left.svg`);
    compHandImg.setAttribute("src", `images/player-hands/${compChoice}-right.svg`);
}

function enableChoices() {
    buttons.forEach(button => button.disabled = false);
}

function disableChoices() {
    buttons.forEach(button => button.disabled = true);
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

function showGameResult() {
    if (scores["user"] > scores["comp"]) {
        gameComments.textContent = "You Win The Game!";
    } else {
        gameComments.textContent = "You Lose to Computer...";
    }
}




