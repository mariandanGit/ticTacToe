const playerXscore = document.getElementById('x-score');
const playerOscore = document.getElementById('o-score');
const gridItems = document.querySelectorAll('.grid-item'); 

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
                
            } 
            else {
                playerOScoreVal++;
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