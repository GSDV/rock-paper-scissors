// SLEEP FUNCTION
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



// REMOVE SCREEN LIMIT
var screenSizeLimit = document.getElementById("limit-window-size");
function removeWindowSizeLimit() {
    screenSizeLimit.style.display = `none`;
}



// DOCUMENT VARIABLES
var matchesPlayedText = document.getElementById("matches-played");
var yourScoreText = document.getElementById("your-score");
var computerScoreText = document.getElementById("computer-score");
var roundsLeftText = document.getElementById("rounds-left");
var blueIcon = document.getElementById("blue-icon");
var redIcon = document.getElementById("red-icon");
var countdownText= document.getElementById("countdown");
var loseOrWinText = document.getElementById(`lose-or-win`);
var userMoveDropdwon = document.getElementById("user-move");
var gameModeDropdwon = document.getElementById("game-mode");



// SET UP 
var matchesPlayed = 0;
var yourScore = 0;
var computerScore = 0;
matchesPlayedText.innerHTML = `Matches Played: ` + matchesPlayed;
yourScoreText.innerHTML = `Your Score: ` + yourScore;
computerScoreText.innerHTML = `Computer Score: ` + computerScore;

var userTotalScore = 0;
var computerTotalScore = 0;



// ROUNDS LEFT
var roundsLeft;

function subtractAMatch() {
    roundsLeft--;
    roundsLeftText.innerHTML = `Matches Left: ` + roundsLeft;
}




// GETTING AND CALCULATING MOVES
// GET USER'S MOVE
var userMove;
function getUserMove() {
    userMove = userMoveDropdwon.value;
    document.getElementById("user-selection").innerHTML = `${userMove[0].toUpperCase()}${userMove.slice(1)}`;
    blueIcon.src = `./icons/blue-` + userMove + `.png`;
}
userMoveDropdwon.addEventListener("change", getUserMove);


// CALCULATE COMPUTER'S MOVE
var randomComputerMove;
var randomComputerMoveArray = [
    `rock`,
    `paper`,
    `scissors`
]
var computedComputerMove;
function getComputerMove() {
    if (chosenGameModeDropdown == `boring`) {
        computedComputerMove = userMove;
    }

    else if (chosenGameModeDropdown == `frustrating`) {
        if (userMove == `rock`) {
            computedComputerMove = `paper`;
        }
        else if (userMove == `paper`) {
            computedComputerMove = `scissors`;
        }
        else if (userMove == `scissors`) {
            computedComputerMove = `rock`;
        }
    }

    else {
        randomComputerMove = Math.floor(Math.random() * 3);
        computedComputerMove = randomComputerMoveArray[randomComputerMove];
    }
}    





// ANIMATION FUNCTIONS
// COUNTDOWN TEXT ANIMATION
async function countdownTextSequence() {    
    countdownText.classList.toggle("countdown-class");
    countdownText.innerHTML = `ROCK`;
    await sleep(700);
    countdownText.classList.toggle("countdown-class");

    countdownText.classList.toggle("countdown-class");
    countdownText.innerHTML = `PAPER`;
    await sleep(700);
    countdownText.classList.toggle("countdown-class");

    countdownText.classList.toggle("countdown-class");
    countdownText.innerHTML = `SCISSORS`;
    await sleep(700);
    countdownText.classList.toggle("countdown-class");

    countdownText.classList.toggle("countdown-class");
    countdownText.innerHTML = `SHOOT!`;
    await sleep(700);
    countdownText.classList.toggle("countdown-class");

    countdownText.innerHTML = ``;
}

// ICON TOGGLE ANIMATIONS
function toggleBlueIconAnimation() {
    blueIcon.classList.toggle("blue-icon-animation");
}
function toggleRedIconAnimation() {
    redIcon.src = `./icons/red-rock.png`
    redIcon.classList.toggle("red-icon-animation");
}




// DETECT USER'S GAME MODE CHOICE
var chosenGameModeDropdown = `three`;
// SET UP THE GAME WHEN THE USER SELECTS A DIFFERENT GAME MODE
function setUpGameMode() {
    getLS();

    chosenGameModeDropdown = gameModeDropdwon.value;
    
    switch (chosenGameModeDropdown) {
        case "three":
            roundsLeft = 3;
            roundsLeftText.innerHTML = `Rounds Left: ` + roundsLeft;

            yourScore = 0;
            computerScore = 0;
            computerScoreText.innerHTML = `Computer Score: ` + computerScore;
            yourScoreText.innerHTML = `Your Score: ` + yourScore;
            break;


        case "five":
            roundsLeft = 5;
            roundsLeftText.innerHTML = `Rounds Left: ` + roundsLeft;
    
            yourScore = 0;
            computerScore = 0;
            computerScoreText.innerHTML = `Computer Score: ` + computerScore;
            yourScoreText.innerHTML = `Your Score: ` + yourScore;
            break;


        case "infinite":
        case "boring":
        case "frustrating":
            roundsLeft = `Infinite`;
            roundsLeftText.innerHTML = `Rounds Left: ` + roundsLeft;
    
            yourScore = 0;
            computerScore = 0;
            computerScoreText.innerHTML = `Computer Score: ` + computerScore;
            yourScoreText.innerHTML = `Your Score: ` + yourScore;
            break;
    }
}
setUpGameMode();
gameModeDropdwon.addEventListener("change", setUpGameMode);





// CALCULATE WINNER OF ROUND
var whoWonTheRound = {};
function calculateWinnerOfRound() {
    if (userMove == computedComputerMove) {
        loseOrWinText.innerHTML = `You And The Computer Tied!`
        whoWonTheRound.answer = `Tie`
    }
    else if ((userMove == `rock` && computedComputerMove == `scissors`) || (userMove == `paper` && computedComputerMove == `rock`) || (userMove == `scissors` && computedComputerMove == `paper`)) {
        loseOrWinText.innerHTML = `You Won This Round!`
        yourScore++;
        yourScoreText.innerHTML = `Your Score: ` + yourScore;
        whoWonTheRound.answer = `User`

        userTotalScore++;
        document.getElementById("total-user-wins").innerHTML = `Your Total Wins:<br>` + userTotalScore;
    }
    else {
        loseOrWinText.innerHTML = `You Lost This Round!`
        computerScore++;
        computerScoreText.innerHTML = `Computer Score: ` + computerScore;
        whoWonTheRound.answer = `Computer`

        computerTotalScore++;
        document.getElementById("total-computer-wins").innerHTML = `Computer Total Wins:<br>` + computerTotalScore;
    }

    if ((userMove !== computedComputerMove) && (chosenGameModeDropdown == `three` || chosenGameModeDropdown == `five`)) {
        subtractAMatch();
    }
    else {}
}





//  POP UP BOX 
var popUpBox = document.getElementById("pop-up-box");
function openPopUp() {
	popUpBox.style.display = "block";
    if (whoWonTheGame == `user`) {
        document.getElementById(`who-won-game`).innerHTML = `You Won This<br>Game!`;
        document.getElementById(`smile-or-frown`).innerHTML = `&#128515;`;
    }
    else if (whoWonTheGame == `computer`) {
        document.getElementById(`who-won-game`).innerHTML = `The Computer Won This<br>Game!`;
        document.getElementById(`smile-or-frown`).innerHTML = `&#x1F4BB;`;
    }
}

function closePopUp() {
	popUpBox.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == popUpBox) {
    popUpBox.style.display = "none";
  }
  else {}
}





// CHECK IF THERE IS A WINNER IN BEST OF 3 OR 5
var whoWonTheGame;
function checkIfGameWinnerExists() {

    if (chosenGameModeDropdown == `three`) {
        if (yourScore == 2 || computerScore == 2) {
            if (yourScore == 2) {
                whoWonTheGame = `user`;
            }
            else {
                whoWonTheGame = `computer`;
            }
            openPopUp();
            setUpGameMode();
        }
    }
    else if (chosenGameModeDropdown == `five`) {
        if (yourScore == 3 || computerScore == 3) {
            if (yourScore == 3) {
                whoWonTheGame = `user`;
            }
            else {
                whoWonTheGame = `computer`;
            }
            openPopUp();
            setUpGameMode();
        }
    }
}





// SET UP THE ROUND
function setUpRound() {
    document.getElementById("play-button").disabled = true;
    document.getElementById("play-button").classList.toggle("second-play-button-class");

    userMoveDropdwon.disabled = true;
    userMoveDropdwon.classList.toggle("second-user-move-class");
    gameModeDropdwon.disabled = true;
    gameModeDropdwon.classList.toggle("second-game-mode-class");
}

// RESET FOR THE ROUND
function resetSetUp() {
    toggleBlueIconAnimation();
    toggleRedIconAnimation();

    document.getElementById("play-button").disabled = false;
    document.getElementById("play-button").classList.toggle("second-play-button-class");

    document.getElementById("computer-move").innerHTML = ``;
    loseOrWinText.innerHTML = ``;

    userMoveDropdwon.disabled = false;
    userMoveDropdwon.classList.toggle("second-user-move-class");
    gameModeDropdwon.disabled = false;
    gameModeDropdwon.classList.toggle("second-game-mode-class");
}










// PLAY GAME BUTTON
async function playGame() {
    // SET UP FOR THE ROUND
    setUpRound();



    // ADD 1 MATCH TO "Matches Played:"
    matchesPlayed++;
    matchesPlayedText.innerHTML = `Matches Played: ` + matchesPlayed;



    // GET USER AND COMPUTER MOVES
    getUserMove();
    blueIcon.src = `./icons/blue-rock.png`;

    getComputerMove();



    // ANIMATION SEQUENCE
    countdownTextSequence();
   
    toggleBlueIconAnimation();
    toggleRedIconAnimation();
    await sleep(2000);
    blueIcon.src = `./icons/blue-` + userMove + `.png`;
    redIcon.src = `./icons/red-` + computedComputerMove + `.png`;
    document.getElementById("computer-move").innerHTML = computedComputerMove;



    // CALCULATE WINNER
    calculateWinnerOfRound();
    await sleep(1500);
    checkIfGameWinnerExists();
    await sleep(1000);



    // RESET SET UP
    resetSetUp();

    // UPDATE LOCAL STORAGE
    updateLS();
}




// GET LOCAL STORAGE VARIABLES
function getLS() {
    let user_stats = JSON.parse(localStorage.getItem("rock-paper-scissors"));
    if (!user_stats) {
        localStorage.setItem("rock-paper-scissors", JSON.stringify(
                        {
                            "matches-played": 0,
                            "user-total-wins":  0,
                            "computer-total-wins": 0
                        }
                        ));
    } else {
        matchesPlayed = user_stats["matches-played"];
        userTotalScore = user_stats["user-total-wins"];
        computerTotalScore = user_stats["computer-total-wins"];

        matchesPlayedText.innerHTML = `Matches Played: ` + matchesPlayed;
        document.getElementById("total-user-wins").innerHTML = `Your Total Wins:<br>` + userTotalScore;
        document.getElementById("total-computer-wins").innerHTML = `Computer Total Wins:<br>` + computerTotalScore;
    }
}

// UDATE LOCAL STORAGE WITH NEW DATA
function updateLS() {
    localStorage.setItem("rock-paper-scissors", JSON.stringify(
            {
                "matches-played": matchesPlayed,
                "user-total-wins":  userTotalScore,
                "computer-total-wins": computerTotalScore
            }
            ));
}