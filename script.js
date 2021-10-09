alert("WELCOME TO ROCK PAPER SCISSOR");
alert("It's you vs the computer");
alert("First to 5 wins!");

let userScore = 0;
let compScore = 0;

let currentRound = 1;
while (userScore < 5 && compScore < 5) {
    let userChoice = prompt("Rock | Paper | Scissors ?").toLowerCase();

    // Alerts "invalid input" if userChoice is not rock, paper, or scissors
    if (userChoice === "" || !["rock", "paper", "scissors"].includes(userChoice)) {
        alert("Invalid Input!");
        continue;
    }
    console.log("UserChoice: " + userChoice);

    let compChoice = getCompChoice();
    console.log("CompChoice: " + compChoice);

    let winner = getWinner(userChoice, compChoice);
    updateWinnerScore(winner);
}




/*----------------------------FUNCTIONS---------------------------------*/
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
    // 0 - player 1 wins
    // 1 - player 2 wins
    // 2 - it's a tie
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

function updateWinnerScore(winner) {
    switch(winner) {
        case 0:
            console.log("You WIN!!");
            console.log(`${userChoice} beats ${compChoice}!`);
            alert(`You WIN!!\n${userChoice} beats ${compChoice}!`)
            userScore++;
            break;
        case 1:
            console.log("You Lose...");
            console.log(`${compChoice} beats ${userChoice}!`);
            alert(`You Lose...\n${compChoice} beats ${userChoice}!`)
            compScore++;
            break;
        case 2:
            console.log("It's a tie.");
            alert("It's a tie.")
            break;
        default:
            alert("Invalid winner.");
    }
}

