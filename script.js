"use strict";

const HAND_CHOICES = ["rock", "paper", "scissors"];

game();

function computerPlay() {
    return HAND_CHOICES[Math.floor(Math.random()*HAND_CHOICES.length)];
}

function playRound(playerSelection, computerSelection) {
    /* 
    Return Values
        1 - Player win
        0 - Tie
       -1 - Player lose
    */
    if (playerSelection == computerSelection) {
        return 0;
    } else {
        let playerWin = (playerSelection == "rock" && computerSelection == "scissors") || (playerSelection == "paper" && computerSelection == "rock") || (playerSelection == "scissors" && computerSelection == "paper");
        
        return (playerWin) ? 1 : -1;
    }
}

function game() {
    let playerPoints = 0, computerPoints = 0;
    let playerSelection, computerSelection;
    let roundResult;

    for (let i = 0; i < 5; i++) {
        playerSelection = prompt("Enter your choice: ").toLowerCase();
        computerSelection = computerPlay();

        roundResult = playRound(playerSelection, computerSelection);

        switch (roundResult) {
            case 1:
                console.log(`You win! ${capitalize(playerSelection)} beats ${computerSelection}.`);
                playerPoints++;
                break;
            case 0:
                console.log(`It's a tie! ${capitalize(playerSelection)} vs. ${computerSelection}.`);
                break;
            case -1:
                console.log(`You lose! ${capitalize(playerSelection)} lost to ${computerSelection}.`);
                computerPoints++;
                break;
        }

        console.log(`Current Points: You - ${playerPoints}; Computer = ${computerPoints}`);
    }

    if (playerPoints > computerPoints) {
        console.log("CONGRATULATIONS! You Won!");
    } else if (playerPoints == computerPoints) {
        console.log("A tie! A good job nonetheless!");
    } else {
        console.log("Sad to say, you lost! Better luck next time!");
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}