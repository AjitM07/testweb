let playerYellow = 'Y';
let playerRed = 'R';
let currPlayer = playerRed;

let gameOver = false;
let board;
let currColumns;

const rows = 6;
const columns = 7;

let redScore = 0;
let yellowScore = 0;


window.onload = function(){
    document.getElementById("popup").style.display="flex";
    setGame();  
}

function updateScoreDisplay() {
    document.getElementById("red-score").innerText = `Red 🔴 : ${redScore}`;
    document.getElementById("yellow-score").innerText = `Yellow 🟡 : ${yellowScore}`;
}


function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5]; // reset column stack
    document.getElementById("board").innerHTML = ""; // clear old tiles
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
           
        }
        board.push(row);
    }

    document.getElementById("winner").innerText = "";
    currPlayer = playerYellow;
    gameOver = false; // critical!
}

function setPiece(){
    if(gameOver){
        return;
    }
    const popSound = new Audio("popsound.mp3");
    popSound.currentTime = 0; // rewind to start for rapid clicks
    window.addEventListener("load", () => {
    pop.play().then(() => pop.pause()); // pre-warm it
    });
    let coords = this.id.split("-"); 
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if(r<0){
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if(currPlayer == playerRed){
        tile.classList.add("red-piece");
        popSound.play();
        currPlayer = playerYellow;
    }
    else{
        tile.classList.add("yellow-piece");
        popSound.play();
        currPlayer = playerRed;
    }
    r -= 1;  
    currColumns[c] = r; 

    checkWinner();
}

function checkWinner(){
    //check horizontally
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //check vertically
    for(let c=0; c<columns; c++){
        for(let r=0; r<rows-3; r++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //check anti-diagonally
    for(let r=0; r<rows-3; r++){
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //check diagonally
    for(let r=3; r<rows; r++){
        for(let c=0; c<columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}


function setWinner(r,c){
     
    let winner = document.getElementById("winner");
    if(board[r][c] == playerRed)
    {
        winner.innerText = "Red Wins !!";
        winner.style.color="#ff3e3e";
        redScore++;
    }
    else if(board[r][c] == playerYellow)
    {
        winner.innerText = "Yellow Wins !!";
        winner.style.color="#fcbf49";
        yellowScore++;
    }
    updateScoreDisplay();
    launchConfetti();
    gameOver = true;
}


function resetBoard() {
    setGame(); 
}


function launchConfetti() {

    const winSound = new Audio('win-sound.mp3');
    winSound.play();
    setTimeout(() => {
        winSound.pause();
        winSound.currentTime = 0;
    }, 4000);
    

  const duration = 4 * 1000; // 4 seconds
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 0,
      spread: 200,
      origin: { x: 0, y: 0.5 } // from left
    });
    confetti({
      particleCount: 4,
      angle: 180,
      spread: 200,
      origin: { x: 1, y: 0.5 } // from right
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

}

function resetBoard(){
    gameOver = false;
    setGame();
}



function closePopup(){
    document.getElementById("popup").style.display="none";
}
