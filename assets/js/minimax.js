var SIZE_TABLE = 3;
var SQ = 3;
var HUMAN = -1;
var COMP = 1;

//Game over
function gameOver(state, player) {
    //check row
    for (let i = 0; i < SIZE_TABLE; i++) {
        for (let j = 0; j < SIZE_TABLE - (SQ - 1); j++) {
            let cnt = 0;
            for (let k = 0; k < SQ; k++) if (state[i][j + k] == player) cnt++;
            if (cnt === SQ) return true;
        }
    }
    //check column
    for (let j = 0; j < SIZE_TABLE; j++) {
        for (let i = 0; i < SIZE_TABLE - (SQ - 1); i++) {
            let cnt = 0;
            for (let k = 0; k < SQ; k++) if (state[i + k][j] == player) cnt++;
            if (cnt === SQ) return true;
        }
    }
    //check \
    for (let i = 0; i < SIZE_TABLE - SQ + 1; i++)
        for (let j = 0; j < SIZE_TABLE - SQ + 1; j++) {
            let cnt = 0;
            for (let k = 0; k < SQ; k++) if (state[i + k][j + k] == player) cnt++;
            if (cnt === SQ) return true;
        }
    //check /
    for (let i = 0; i < SIZE_TABLE - SQ + 1; i++)
        for (let j = SIZE_TABLE - 1; j >= SQ - 1; j--) {
            let cnt = 0;
            for (let k = 0; k < SQ; k++) if (state[i + k][j - k] == player) cnt++;
            if (cnt === SQ) return true;
        }
    return false;
}

// check game is finish
function gameFinish(state) {
    if (gameOver(state, HUMAN)) return -1;
    if (gameOver(state, COMP)) return 1;
    return 0;
}

// find empty place [x,y]
function emptyCells(state) {
    var cells = [];
    for (let x = 0; x < SIZE_TABLE; x++) {
        for (let y = 0; y < SIZE_TABLE; y++) {
            if (state[x][y] == 0) cells.push([x, y]);
        }
    }
    return cells;
}

// minimax algorithms
function minimax(state, depth, player) {
    var best;
    // init
    if (player == COMP) best = [-1, -1, -1000];
    else best = [-1, -1, 1000];

    // flag
    score = gameFinish(state);
    if (depth == 0 || score != 0) return [-1, -1, score];

    // try
    emptyCells(state).forEach((cell) => {
        let x = cell[0],
            y = cell[1];
        state[x][y] = player;
        let score = minimax(state, depth - 1, -player);
        state[x][y] = 0;
        score[0] = x;
        score[1] = y;
        // min max => res
        if (player == COMP) {
            if (score[2] > best[2]) best = score;
        } else {
            if (score[2] < best[2]) best = score;
        }
    });
    return best;
}