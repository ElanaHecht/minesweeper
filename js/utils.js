'use strict'

// initGame
// getRandomColor
// getRandomInt
// getTime
// createMat
// printMat
// countNeighbors
// getNeighbors
// copyMat
// drawNum
// printPrimaryDiagonal
// printSecondaryDiagonal
// shuffleArray
// toggleModal
// setTimer
// getMoveDiff
// playSound
// setInterval
// setTimeout
// getRandomEmptyCell




function initGame() {
  //things the game needs plus this:
  gBoard = buildBoard();
  renderBoard(gBoard);
}



function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);//the min is inclusive and the max is exclusive
}


function getTime() {
  return new Date().toString().split(' ')[4];
}


function createMat(rowNum, colNum) {
  var mat = [];
  for (var i = 0; i < rowNum; i++) {
    mat[i] = [];
    for (var j = 0; j < colNum; j++) {
      mat[i][j] = '';
    }
  }
  return mat;
}


function renderMat(mat, selector) {
  var strHTML = `<table border="0"><tbody>`;
  for (var i = 0; i < mat.length; i++) {
    strHTML += `<tr>`;
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = `cell cell${i}-${j}`;
      // var className = (cell === 'S') ? 'seat' : ' ';
      strHTML += `<td class="${className}"></td>`;
    }
    strHTML += `</tr>`;
  }
  strHTML += `</tbody></table>`;
  var elcontainer = document.querySelector(selector);
  elcontainer.innerHTML = strHTML;
}


function countNeighbors(cellI, cellJ, mat) {
  var neighborsCount = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= mat[i].length) continue;
      if (mat[i][j]) neighborsCount++;
    }
  }
  return neighborsCount;
}


function getNeighbors(pos) { //cellI, cellJ or just pos
  var neighbors = [];
  for (var i = pos.i; i <= pos.i + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = pos.j; j <= pos.j + 1; j++) {
      if (i === pos.i && j === pos.j) continue;
      if (j < 0 || j >= pos.j) continue;
      if (mat[i][j] === currCell) neighbors.push({ i, j });
    }
  }
}

function copyMat(mat) {
  var newMat = [];
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = [];
    for (var j = 0; j < mat.length; j++) {
      newMat[i][j] = mat[i][j];
    }
  }
  return newMat;
}


function drawNum() {
  var idx = getRandomInt(0, gNums.length)
  var num = gNums[idx]
  gNums.splice(idx, 1)
  return num
}

function printPrimaryDiagonal() {
  for (var d = 0; d < squareMat.length; d++) {
    var item = squareMat[d][d];
    console.log(item);
  }
}

function printSecondaryDiagonal() {
  for (var d = 0; d < squareMat.length; d++) {
    var item = squareMat[d][squareMat.length - 1 - d];
    console.log(item);
  }
}


function shuffleArray(array) {
  board[i][j] = (Math.random() > 0.5) ? 'var1' : 'var2'
  // array.sort(() => Math.random() - 0.5);
  return array
}


function toggleModal(display, status) {
  var elModal = document.querySelector('.modal');
  if (status) {
    var elModalText = elModal.querySelector('h2');
    elModalText.innerText = (status === 'win') ? 'You won!!!\nPlay again?' : 'You lost...\nPlay again?'
  }
  elModal.style.display = display;
}

function setTimer() {
  var now = new Date().getTime();
  var t = deadline - now;
  //var days = Math.floor(t /(1000 * 60 * 60 * 24));
  var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var hours = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  var hours = Math.floor((t % (1000 * 60)) / 1000);
}


//if we have 4 possible moves:
function getMoveDiff() {
  var randNum = getRandomInt(0, 101)
  if (randNum <= 25) {
    return { i: 0, j: 1 }//direction1
  }
  else if (randNum <= 50) {
    return { i: 1, j: 0 }//direction2
  }
  else if (randNum <= 75) {
    return { i: -1, j: 0 }//direction3  
  }
  else if (randNum <= 100) {
    return { i: 0, j: -1 }//direction4
  }
}


function playSound() {
  var sound = new Audio(".mp3")
  sound.play();
}


function getRandomEmptyCell() {
  var emptyCells = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === EMPTY) {
        emptyCells.push({ i, j })
      }
    }
  }
  var randIdx = getRandomInt(0, emptyCells.length);
  return emptyCells[randIdx];
}


