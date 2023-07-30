let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let gameOver = false;
let currentPlayer = null;
const players = ["X", "O"];

// ゲーム盤を生成する関数
function generateBoard() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.onclick = () => placeSymbol(row, col);
            boardContainer.appendChild(cell);
        }
    }
}

function startGame() {
    // スタートボタンを非表示にし、ゲームコンテナを表示する
    document.getElementById("start-button-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    // ゲーム盤を生成する
    generateBoard();

    // 先攻後攻をランダムに決定する
    currentPlayer = players[Math.floor(Math.random() * players.length)];
    document.getElementById("message").textContent = `${currentPlayer}が先攻です。`;
    if (currentPlayer === "O") {
        // コンピュータの手を選ぶ
        computerMove();
    }
}

// 勝ち負けのチェック
function check() {
    // 横列のチェック
    for (let row = 0; row < 3; row++) {
        if (board[row][0] && board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
        return board[row][0];
        }
    }

    // 縦列のチェック
    for (let col = 0; col < 3; col++) {
        if (board[0][col] && board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
        return board[0][col];
        }
    }

    // 斜めのチェック
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return board[0][2];
    }

    // 引き分けのチェック
    if (!board.flat().includes("")) {
        return "draw";
    }

    return null;
}

function placeSymbol(row, col) {
    if (gameOver || board[row][col]) {
        return;
    }

    board[row][col] = currentPlayer;
    document.getElementById("message").textContent = "";

    const cell = document.getElementsByClassName("cell")[row * 3 + col];
    cell.textContent = currentPlayer;

    const winner = check();
    if (winner) {
        gameOver = true;
        if (winner === "draw") {
            document.getElementById("message").textContent = "引き分けです。";
        } else {
            document.getElementById("message").textContent = `${winner}の勝ちです！`;
        }
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (currentPlayer === "O") {
            // コンピュータの手をランダムに選択
            computerMove();
        }
    }
}

function computerMove() {
    // 空いているセルのリストを取得
    const availableCells = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (!board[row][col]) {
                availableCells.push({ row, col });
            }
        }
    }
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const { row, col } = availableCells[randomIndex];
    setTimeout(() => placeSymbol(row, col), 500); // コンピュータが手を選ぶ遅延を追加
}




// 初期の盤面をランダムに生成する
function RandomBoard() {
    const board = [];
    for (let row = 0; row < 5; row++) {
        board.push([]);
        for (let col = 0; col < 5; col++) {
            board[row].push(Math.random() < 0.5);
        }
    }
    return board;
}

const LBoard = RandomBoard();



// ライトの反転を周りにも適用する
function toggleLightsOutCell(row, col) {
    LBoard[row][col] = !LBoard[row][col];

    // 上
    if (row > 0) {
        LBoard[row - 1][col] = !LBoard[row - 1][col];
    }

    // 下
    if (row < 4) {
        LBoard[row + 1][col] = !LBoard[row + 1][col];
    }

    // 左
    if (col > 0) {
        LBoard[row][col - 1] = !LBoard[row][col - 1];
    }

    // 右
    if (col < 4) {
        LBoard[row][col + 1] = !LBoard[row][col + 1];
    }

    updateBoard();
}

// 押された際の盤面の更新
function updateBoard() {
    const BoardElement = document.getElementById("lights-out-board");
    BoardElement.innerHTML = "";

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cellValue = LBoard[row][col] ? "〇" : "×";
            const cellClass = LBoard[row][col] ? "lights-out-cell-on" : "lights-out-cell-off";
            const cellElement = document.createElement("div");
            cellElement.className = `lights-out-cell ${cellClass}`;
            cellElement.textContent = cellValue;
            cellElement.onclick = () => toggleLightsOutCell(row, col);
            BoardElement.appendChild(cellElement);
        }
    }

    const AllOff = LBoard.flat().every(cell => !cell);
    if (AllOff) {
        document.getElementById("lights-out-message").textContent = "すべてのライトが消えました！";
    } else {
        document.getElementById("lights-out-message").textContent = "";
    }
    
    const AllON = LBoard.flat().every(cell => cell);
    if (AllON) {
        document.getElementById("lights-on-message").textContent = "すべてのライトが点灯しました！";
    } else {
        document.getElementById("lights-on-message").textContent = "";
    }
}

function turnOffAll() {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        LBoard[row][col] = false;
      }
    }
    updateBoard();
}

function turnONAll() {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        LBoard[row][col] = true;
      }
    }
    updateBoard();
}

updateBoard();





