var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var sizeInput = document.getElementById("size");
var changeSize = document.getElementById("change-size");
var scoreLabel = document.getElementById("score");

var playAgain = document.getElementById("playAgain");
var finalScore = document.getElementById("finalScore");

var submit = document.getElementById("submit");


var score = 0;
var size = 4;
var width = canvas.width / size - 6;

var cells = [];
var fontSize;
var loss = false;


/*changeSize.onclick = function() {
    if (sizeInput.value >= 2 && sizeInput.value <= 20) {
        size = sizeInput.value;
        width = canvas.width / size - 6;
        canvasClear();
        startGame();
    }
}*/

playAgain.onclick = function() {
    canvasClear();
    startGame();
    $('[data-popup=popup-2]').fadeOut(100);
}

function canvasClear() {
    ctx.clearRect(0, 0, 500, 500);
}

startGame();

function startGame() {
    score = 0;
    scoreLabel.innerHTML = "Score : " + score;
    canvas.style.opacity = 1;
    loss = false;
    createCells();
    drawAllCells();
    pasteNewCell();
    pasteNewCell();
}

function cell(row, col) {
    this.value = 0;
    this.x = col * width + 5 * (col + 1);
    this.y = row * width + 5 * (row + 1);
}

function createCells() {
    for (var i = 0; i < size; i++) {
        cells[i] = [];
        for (var j = 0; j < size; j++) {
            cells[i][j] = new cell(i, j);
        }
    }
}

function drawCell(cell) {
    ctx.beginPath();
    ctx.rect(cell.x, cell.y, width, width);

    switch (cell.value) {
        case 0:
            ctx.fillStyle = "#ccc0b3";
            break;
        case 2:
            ctx.fillStyle = "#d7cec5";
            break;
        case 4:
            ctx.fillStyle = "#d5cab4";
            break;
        case 8:
            ctx.fillStyle = "#e19a62";
            break;
        case 16:
            ctx.fillStyle = "#e87c4d";
            break;
        case 32:
            ctx.fillStyle = "#ea614e";
            break;
        case 64:
            ctx.fillStyle = "#ed472d";
            break;
        case 128:
            ctx.fillStyle = "#d8b758";
            break;
        case 256:
            ctx.fillStyle = "#d9b449";
            break;
        case 512:
            ctx.fillStyle = "#d9b23b";
            break;
        case 1024:
            ctx.fillStyle = "#daaf2c";
            break;
        case 2048:
            ctx.fillStyle = "#edc22e";
            break;
        case 4096:
            ctx.fillStyle = "#3e3933";
            break;
        default:
            ctx.fillStyle = "#FFFFFF";

    }

    ctx.fill();
    if (cell.value) {
        fontSize = width / 2;
        ctx.font = fontSize + "px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width / 7);
    }
}

function drawAllCells() {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            drawCell(cells[i][j]);
        }
    }
}

function pasteNewCell() {

    var countEmpty = 0;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (!cells[i][j].value) {
                countEmpty++;
            }
        }
    }

    if (!countEmpty) {
        finishGame();
        return;
    }

    while (true) {
        var row = Math.floor(Math.random() * size);
        var col = Math.floor(Math.random() * size);
        if (!cells[row][col].value) {
            cells[row][col].value = 2 * Math.ceil(Math.random() * 2);
            drawAllCells();
            return;
        }
    }
}

document.onkeydown = function(event) {
    if (!loss) {
        if (event.keyCode == 38 || event.keyCode == 87) {
            moveUp();
        } else if (event.keyCode == 39 || event.keyCode == 68) {
            moveRight();
        } else if (event.keyCode == 40 || event.keyCode == 83) {
            moveDown();
        } else if (event.keyCode == 37 || event.keyCode == 65) {
            moveLeft();
        }
        scoreLabel.innerHTML = "Score : " + score;
    }
}

function moveUp() {
    var i, j;
    var row;
    for (j = 0; j < size; j++) {
        for (i = 1; i < size; i++) {
            if (cells[i][j].value) {
                row = i;
                while (row > 0) {
                    if (!cells[row - 1][j].value) {
                        cells[row - 1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row--;
                    } else if (cells[row - 1][j].value == cells[row][j].value) {
                        cells[row - 1][j].value *= 2;
                        score += cells[row][j].value;
                        cells[row][j].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}

function moveRight() {
    var i, j;
    var coll;
    for (i = 0; i < size; i++) {
        for (j = size - 2; j >= 0; j--) {
            if (cells[i][j].value) {
                coll = j;
                while (coll + 1 < size) {
                    if (!cells[i][coll + 1].value) {
                        cells[i][coll + 1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll++;
                    } else if (cells[i][coll].value == cells[i][coll + 1].value) {
                        cells[i][coll + 1].value *= 2;
                        score += cells[i][coll].value;
                        cells[i][coll].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}

function moveDown() {
    var i, j;
    var row;
    for (j = 0; j < size; j++) {
        for (i = size - 2; i >= 0; i--) {
            if (cells[i][j].value) {
                row = i;
                while (row + 1 < size) {
                    if (!cells[row + 1][j].value) {
                        cells[row + 1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row++;
                    } else if (cells[row][j].value == cells[row + 1][j].value) {
                        cells[row + 1][j].value *= 2;
                        score += cells[row][j].value;
                        cells[row][j].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}

function moveLeft() {
    var i, j;
    var coll;
    for (i = 0; i < size; i++) {
        for (j = 1; j < size; j++) {
            if (cells[i][j].value) {
                coll = j;
                while (coll > 0) {
                    if (!cells[i][coll - 1].value) {
                        cells[i][coll - 1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll--;
                    } else if (cells[i][coll].value == cells[i][coll - 1].value) {
                        cells[i][coll - 1].value *= 2;
                        score += cells[i][coll].value;
                        cells[i][coll].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}

function finishGame() {
    canvas.style.opacity = "0.5";
    loss = true;
    finalScore.innerHTML = score;
    $('[data-popup=popup-1]').fadeIn(350);
    $('[data-popup-close]').on('click', function(e) {
        $('[data-popup=popup-1]').fadeOut(350);
        e.preventDefault();
    });
    submit.onclick = function() {
        $('[data-popup=popup-1]').fadeOut(350);
        $('[data-popup=popup-2').fadeIn(350);
    }

}