document.querySelectorAll('.cell').forEach(cell => {
    return cell.addEventListener('click', handleClick);
});
document.querySelector('.reset').addEventListener('click', resetGame);
const display = document.querySelector('.player');

let player = {
    Player1: 'X',
    Player2: 'O'
}

let currentPlayer = player.Player1;


let state = ["", "", "", "", "", "", "", "", ""];
const winCondition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let isStart = true;

const winner = () => {
    if(currentPlayer === player.Player1) {
        return alert(`Congratulations! Player1( X ) wins`)
    } else {
        return alert(`Congratulations! Player2( O ) wins`)   
    }
}

const nowTurn = () => `First-Turn: ${currentPlayer}`;
display.innerHTML = nowTurn();

function handleClick(event) { 
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('idx'));

    if(state[cellIndex] !== "" || !isStart) {
        return;
    }
    afterClick(cell, cellIndex);
    checkResult();
}

function afterClick(cell, cellIndex){
    state[cellIndex] = currentPlayer;
    cell.innerHTML = currentPlayer;
    
} 

function nextPlayer(){
    if(currentPlayer === player.Player1) {
        return currentPlayer = player.Player2;
    } else {
        return currentPlayer = player.Player1;
    }
}


function checkResult() {
    let isWon = false;
    for(let i = 0; i <= 7; i++) {
        const win = winCondition[i];
        let a = state[win[0]];
        let b = state[win[1]];
        let c = state[win[2]];

        if(a === '' || b === '' || c === '') {
            continue;
        }
        
        if(a === b && b === c) {
            isWon = true;
            break;
        }
    }
    if(isWon) {
        winner();
        isStart = false;
        return;
    }
    let draw = !state.includes("");
    if(draw) {
        alert('Draw!');
        isStart = false;
        return;
    }
    nextPlayer();
}

function resetGame() {
    state = ["", "", "", "", "", "", "", "", ""];
    isStart = true;
    currentPlayer = player.Player1;
    display.innerHTML = nowTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}