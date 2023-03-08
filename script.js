const playerXscore = document.getElementById('x-score');
const playerOscore = document.getElementById('o-score');
const gridItems = document.querySelectorAll('.grid-item'); 
const playButton = document.getElementById('play-button');
const startOverlay = document.getElementById('start-overlay');

const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const upButton = document.querySelector('.fa-chevron-up');
const downButton = document.querySelector('.fa-chevron-down');

const endOverlay = document.getElementById('end-overlay');
const tryAgainButton = document.getElementById('try-again-button');
const backButton = document.getElementById('back-button');
const winningPlayer = document.getElementById('winning-player');

endOverlay.style.display = "none";

tryAgainButton.addEventListener('click', () => {
    endOverlay.style.display = "none";
    resetScore();
});
backButton.addEventListener('click', () => {
    endOverlay.style.display = "none";
    startOverlay.style.display = "block";
    resetScore();
});

let currentItemIndex = 0;
let playerType = 'player';

function showCurrentItem() {
    carouselItems.forEach((item, index) => {
        if (index === currentItemIndex) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

upButton.addEventListener('click', () => {
    currentItemIndex--;
    if (currentItemIndex < 0) {
        currentItemIndex = carouselItems.length - 1;
    }
    showCurrentItem();
});

downButton.addEventListener('click', () => {
    currentItemIndex++;
    if (currentItemIndex >= carouselItems.length) {
        currentItemIndex = 0;
    }
    showCurrentItem();
});

showCurrentItem();


playButton.addEventListener('click', () => {
    startOverlay.style.display = "none";
});

let gameBoard = [               
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
let currentPlayer = 'x';          
let playerXScoreVal = 0;             
let playerOScoreVal = 0;
let numOfMoves = 0;
playerXscore.textContent = playerXScoreVal;
playerOscore.textContent = playerOScoreVal;

function checkForWinner() {
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] !== null && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
            return true;
        }
        if (gameBoard[0][i] !== null && gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]) {
            return true;
        }
    }

    if (gameBoard[0][0] !== null && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) {
        return true;
    }
    if (gameBoard[0][2] !== null && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) {
        return true;
    }
}

function resetGame() {
    numOfMoves = 0;
    gridItems.forEach((item, index) => {
        item.textContent = "";
        if(item.classList.contains('x')){
            item.classList.remove('x');
        }
        if(item.classList.contains('o')){
            item.classList.remove('o');
        }    
    });
    gameBoard = [               
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];
}

function resetScore(){
    playerXscore.textContent = 0;
    playerOscore.textContent = 0;
    playerXScoreVal = 0;             
    playerOScoreVal = 0;
}

gridItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        numOfMoves++;

        if (gameBoard[Math.floor(index / 3)][index % 3] !== null || checkForWinner()) {
            return;
        }
      
        gameBoard[Math.floor(index / 3)][index % 3] = currentPlayer;
        item.textContent = currentPlayer;
        item.classList.add(currentPlayer);

        if (checkForWinner()) {
            if (currentPlayer === 'x') {
                playerXScoreVal++;
                if(playerXScoreVal === 3){
                    endOverlay.style.display = 'block';
                    winningPlayer.textContent = "PLAYER 1 WINS!";
                }
            } 
            else {
                playerOScoreVal++;
                if(playerOScoreVal === 3){
                    endOverlay.style.display = 'block';
                    winningPlayer.textContent = "PLAYER 2 WINS!";
                }            
            }
            playerXscore.textContent = playerXScoreVal;
            playerOscore.textContent = playerOScoreVal;
            setTimeout(() => {
                resetGame();
              }, 1000);
            
            return;
        }
        if(numOfMoves === 9){
            setTimeout(() => {
                resetGame();
              }, 1000);
        }
        if(currentPlayer === 'x'){
            currentPlayer = 'o';
        }
        else{
            currentPlayer = 'x';
        }
    });
  });