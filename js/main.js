const utils = require('./utils');
const game = require('./game');

const board = document.getElementById('game-board');
const boardWidth = 160;
const aspectRatio = .43;
const boardHeight = boardWidth * aspectRatio;

board.style.gridTemplateColumns = 'auto '.repeat(boardWidth);

let gameState = 'STOPPED';
let boardState = [];
let initialState = [];
let tickSpeed;
let tickIntervalId;

function initBoardState() {
    boardState = [];
    for (let i = 0; i < boardHeight; i++) {
        const row = [];
        for (let j = 0; j < boardWidth; j++) {
            row.push(0);
        }
        boardState.push(row);
    }
}

for (let i = 0; i < boardHeight; i++) {
    for (let j = 0; j < boardWidth; j++) {
        const cell = document.createElement('div');
        cell.id = `cell-${i}-${j}`;
        cell.classList.add('cell-inactive');
        cell.onclick = () => {
            if (gameState === 'STOPPED') {
                if (boardState[i][j]) {
                    cell.classList.remove('cell-active');
                    cell.classList.add('cell-inactive');
                    boardState[i][j] = 0
                } else {
                    cell.classList.remove('cell-inactive');
                    cell.classList.add('cell-active');
                    boardState[i][j] = 1
                }
                initialState = utils.deepCopy(boardState);
            }
        };
        board.appendChild(cell);
    }
}

initBoardState();

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
    boardState = initialState;
    render();
};

const clearButton = document.getElementById('clear-button');
clearButton.onclick = () => {
    initBoardState();
    render();
};

const startStopButton = document.getElementById('start-stop-button');
startStopButton.onclick = () => {
    if (gameState === 'STOPPED') {
        gameState = 'RUNNING';
        startStopButton.style.background = '#990f13';
        startStopButton.textContent = 'Stop';
    } else if (gameState === 'RUNNING') {
        gameState = 'STOPPED';
        startStopButton.style.background = '#49991e';
        startStopButton.textContent = 'Start';
    }
};

const speedSlider = document.getElementById('speed-control');
const speedSliderLabel = document.getElementById('speed-control-label');
speedSlider.oninput = () => {
    speedSliderLabel.innerHTML = `Speed: ${speedSlider.value}`;
    clearInterval(tickIntervalId);
    startInterval();
};

function startInterval() {
    tickSpeed = 20 * (11 - Number(speedSlider.value));
    tickIntervalId = window.setInterval(() => {
        if (gameState === 'RUNNING') {
            boardState = game.update(boardState);
            render();
        }
    }, tickSpeed);
}

startInterval();

function render() {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            if (boardState[i][j]) {
                cell.classList.remove('cell-inactive');
                cell.classList.add('cell-active');
            } else {
                cell.classList.remove('cell-active');
                cell.classList.add('cell-inactive');
            }
        }
    }
}
