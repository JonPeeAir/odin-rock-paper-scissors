alert("WELCOME TO ROCK PAPER SCISSOR");
alert("It's you vs the computer");
alert("First to 5 wins!");
let userChoice = prompt("Rock | Paper | Scissors ?").toLowerCase();
console.log("UserChoice: " + userChoice);
console.log("CompChoice: " + getCompChoice());

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
