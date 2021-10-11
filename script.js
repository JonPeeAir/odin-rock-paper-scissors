



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

function updateWinnerScore(winner, scores) {
    switch(winner) {
        case 0:
            scores["user"]++;
            break;
        case 1:
            scores["comp"]++;
            break;
        default:
            return;
    }
}


