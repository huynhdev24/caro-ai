var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];
var yourTurn = true;
var tick = true;

table = document.getElementById("table");
mess = document.getElementById("mess");
btn = document.getElementById("btn");
// create board game
// repair screen
const _repair = () => {
    for (let i = 0; i < 9; i++) table.innerHTML += `<div class="sq"></div>`;
};
_repair();

//from STT idx => VT (x, y)
const _index = (idx) => {
    let x, y;
    x = Math.floor(idx / 3);
    y = idx - x * 3;
    return { x, y };
}

const turnBtn = (o) => {
    if (o == true) {
        btn.style.poiterEvents = "fill";
        btn.style.color = "#000";
    } else {
        btn.style.poiterEvents = "none";
        btn.style.color = "#CD0404";
    }
};

sq_game = document.querySelectorAll(".sq");
const _color = () => {
    sq_game.forEach((sq, idx) => {
        let { x, y } = _index(idx);
        if (board[x][y] == -1) {
            sq.innerHTML = "X";
            sq.style.color = "blue";
        } else if (board[x][y] == 1) {
            sq.innerHTML = "O";
            sq.style.color = "red";
        }
    });
}

const _message = (m) => {
    tick = false;
    if (m == 0) (mess.innerHTML = "Draw!"), (mess.style.color = "blue");
    else if (m == 1) (mess.innerHTML = "Lose!"), (mess.style.color = "red");
    else if (m == -1) (mess.innerHTML = "Win!"), (mess.style.color = "green");
    turnBtn(true);
    btn.innerHTML = "Restart";
};

const _clean = () => {
    turnBtn(true);
    btn.innerHTML = "Start AI";
    mess.innerHTML = "";
    sq_game.forEach((sq, idx) => {
        let { x, y } = _index(idx);
        board[x][y] = 0;
        sq.innerHTML = "";
    });
    yourTurn = true;
    tick = true;
};

const botPlay = () => {
    let len = emptyCells(board).length;
    let bot = minimax(board, len, COMP);
    if (bot[0] === -1) {
        _message(0);
        return;
    }
    board[bot[0]][bot[1]] = 1;
    _color();
    if (len == 1) {
        if (gameOver(board, COMP)) _message(-1);
        else _message(0);
        return;
    }
    yourTurn = true;
};

const _random = () => {
    let x = Math.floor(Math.random() * 3);
    let y = Math.floor(Math.random() * 3);
    board[x][y] = 1;
    _color();
}

function start_game() {
    _clean();
    sq_game.forEach((sq, idx) => {
        let { x, y } = _index(idx);
        sq.addEventListener("click", () => {
            if (yourTurn && board[x][y] === 0 && tick) {
                turnBtn(false);
                board[x][y] = -1;
                _color();
                yourTurn = false;
                if (gameOver(board, HUMAN)) {
                    _message(-1);
                    return;
                }
                botPlay();
                if (gameOver(board, COMP)) {
                    _message(1);
                    return;
                }
            }
        });
    });
}

start_game();
btn.addEventListener("click", () => {
    if (btn.innerHTML === "Start AI") {
        turnBtn(false);
        _random();
    } else {
        start_game();
    }
});