"use strict";

const HAND_CHOICES = ["rock", "paper", "scissors"];

const buttons = document.querySelectorAll("button");
const playerSelection = document.querySelector("#player-selection");
const computerSelection = document.querySelector("#computer-selection");
const result = document.querySelector("#result span");
const playerScoreText = document.querySelector("#player-score");
const computerScoreText = document.querySelector("#computer-score");
const finalMessage = document.querySelector("#final-message span");

let playerScore = 0, computerScore = 0;

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        let playerSelection = btn.id;
        let computerSelection = computerPlay();
        let roundResult = playRound(playerSelection, computerSelection);
        
        switch (roundResult) {
            case 1:
                playerScore++;
                break;
            case 0:
                break;
            case -1:
                computerScore++;
                break;
        }

        displayRoundResult(roundResult, playerSelection, computerSelection);

        if (checkForWinner()) endGame();
    });
});

function computerPlay() {
    return HAND_CHOICES[randomNumber(0, HAND_CHOICES.length-1)];
}

function playRound(playerSelection, computerSelection) {
    /* 
    Return Values
        1 - Player win
        0 - Draw
       -1 - Player lose
    */
    if (playerSelection == computerSelection) {
        return 0;
    }

    let playerWin = (playerSelection == "rock" && computerSelection == "scissors") || 
            (playerSelection == "paper" && computerSelection == "rock") || 
            (playerSelection == "scissors" && computerSelection == "paper");
    
    if (playerWin) return 1;
    return -1;
}

function displayRoundResult(roundResult, newPlayerSelection, newComputerSelection) {
    switch (roundResult) {
        case 1:
            result.textContent = `You win! ${capitalize(newPlayerSelection)} beats ${newComputerSelection}.`;
            break;
        case 0:
            result.textContent = `It's a draw! ${capitalize(newPlayerSelection)} vs. ${newComputerSelection}.`;
            break;
        case -1:
            result.textContent = `You lose! ${capitalize(newPlayerSelection)} lost to ${newComputerSelection}.`;
            break;
    }

    playerSelection.textContent = capitalize(newPlayerSelection);
    computerSelection.textContent = capitalize(newComputerSelection);
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;
}

function checkForWinner() {
    if (playerScore == 5 || computerScore == 5) {
        return true;
    }
    return false
}

function endGame() {
    buttons.forEach((btn) => btn.remove());

    if (playerScore > computerScore) {
        finalMessage.textContent = "CONGRATULATIONS! You Won!";
    } else if (playerScore == computerScore) {
        finalMessage.textContent = "A tie! A good job nonetheless!";
    } else {
        finalMessage.textContent = "Sad to say, you lost! Better luck next time!";
    }

    finalMessage.parentNode.style.display = "grid";
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}