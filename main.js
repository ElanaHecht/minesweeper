'use strict'

var gBoard = []
var gFirstClick = null;
var gLevel = {
   SIZE: 4,
   MINES: 2
}

var gGame = {
   isOn: false,
   timeStart: 0,
   livesLeft: 3,
   shownCount: 0,
   markedCount: 0,
   hintsCount: 3,
   hintsClicked: false
}

const MINE = '💣';
const FLAG = '🚩';
const SMILE = '😃';
const WON = '😎';
const LOST = '😣';
const HINT = '💡';



init()
function init() {
   var elBtn = document.querySelector('.restart');
   elBtn.innerText = SMILE;
   gFirstClick = null;
   createBoard();
   gGame.isOn = true;
   gGame.livesLeft = 3;
   gGame.shownCount = 0;
   gGame.markedCount = 0,
      gGame.secsPassed = 0;
   gGame.hintsCount = 3;
   renderHeart();
   renderHints();
   renderMinesLeft();
   renderBoard(gBoard);
}

function createBoard() {
   gBoard = [];
   for (var i = 0; i < gLevel.SIZE; i++) {
      gBoard[i] = [];
      for (var j = 0; j < gLevel.SIZE; j++) {
         gBoard[i][j] = {
            minesAroundCount: 0,
            isShown: false,
            isMine: false,
            isMarked: false
         };
      }
   }
}


function renderBoard() {
   var strHTML = '';
   for (var i = 0; i < gLevel.SIZE; i++) {
      strHTML += `<tr class="board-row">`;
      for (var j = 0; j < gLevel.SIZE; j++) {
         strHTML += `<td class="cell" oncontextmenu="cellMarked(${i}, ${j}); return false" onclick="cellClicked(${i}, ${j})"></td>`;
      }
      strHTML += `</tr>`;
   }
   var elCells = document.querySelector('.board-cells');
   elCells.innerHTML = strHTML;
   // console.log(gBoard[0]);
}

function setRandomMineCells() {
   for (var i = 0; i < gLevel.MINES; i++) {
      var randI = getRandomInt(0, gLevel.SIZE);
      var randJ = getRandomInt(0, gLevel.SIZE);
      while (gBoard[randI][randJ].isMine || (gFirstClick[0] === randI && gFirstClick[1] === randJ)) {
         randI = getRandomInt(0, gLevel.SIZE);
         randJ = getRandomInt(0, gLevel.SIZE);
      }
      gBoard[randI][randJ].isMine = true;
      console.log(randI, randJ);
   }
}

function renderHeart() {
   var elLife = document.querySelector('.lives');
   elLife.innerText = '💗'.repeat(gGame.livesLeft)
}

function renderHints() {
   var elLife = document.querySelector('.hints');
   elLife.innerText = HINT.repeat(gGame.hintsCount)
}

function renderTime() {
   if (gGame.isOn) {
      var elTimer = document.querySelector('.timer');
      elTimer.innerText = Math.floor((new Date().getTime() - gGame.timeStart) / 1000);
      setTimeout(renderTime, 1000)
   }
}

function renderMinesLeft() {
   var elMinesLeft = document.querySelector('.mines-left');
   elMinesLeft.innerText = 'Mines left: ' + gLevel.MINES - gGame.markedCount;
}

function renderCell(cellI, cellJ) {
   // console.log(cellI, cellJ);
   var elRows = document.querySelectorAll('tr');
   var elRow = elRows[cellI];
   var elCells = elRow.querySelectorAll('td');
   var elCell = elCells[cellJ];
   var cell = gBoard[cellI][cellJ];
   // console.log(cell);
   if (cell.isShown) {
      if (cell.isMine) {
         elCell.innerText = MINE;
      } else if (cell.minesAroundCount) {
         elCell.innerText = cell.minesAroundCount
      } else {
         elCell.innerText = '';
      }
      if (!elCell.classList.contains('shown')) {
         elCell.classList.add('shown');
      }
   } else {
      if (elCell.classList.contains('shown')) {
         elCell.classList.remove('shown')
      }
      if (cell.isMarked) {
         elCell.innerText = FLAG;
      } else {
         elCell.innerText = ''
      }
   }
}

function setMinesNegsCount() {
   for (var i = 0; i < gLevel.SIZE; i++) {
      for (var j = 0; j < gLevel.SIZE; j++) {
         if (!gBoard[i][j].isMine) {
            gBoard[i][j].minesAroundCount = getMinesAroundCount(i, j);
         }
      }
   }
}

function getMinesAroundCount(cellI, cellJ) {
   var mineCount = 0;
   for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= gLevel.SIZE) continue;
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
         if (i === cellI && j === cellJ) continue;
         if (j < 0 || j >= gLevel.SIZE) continue;
         if (gBoard[i][j].isMine) mineCount++;
      }
   }
   return mineCount
}

function setLevel(elBtn) {
   switch (elBtn.innerText) {
      case 'Beginner':
         gLevel.SIZE = 4;
         gLevel.MINES = 2;
         break;
      case 'Intermediate':
         gLevel.SIZE = 8;
         gLevel.MINES = 12;
         break;
      case 'Expert':
         gLevel.SIZE = 12;
         gLevel.MINES = 30;
         break;
   }
   init();
}

function onHints() {
   if (gGame.hintsClicked || (gFirstClick === null)) return;
   gGame.hintsClicked = true;
   gGame.hintsCount--;
   renderHints()
}

function cellClicked(cellI, cellJ) {
   if (gFirstClick === null) {
      gFirstClick = [cellI, cellJ];
      gGame.timeStart = new Date().getTime();
      setRandomMineCells();
      setMinesNegsCount();
      renderTime();
   }
   var cell = gBoard[cellI][cellJ];
   if (cell.isMarked || cell.isShown) return;
   if (gGame.hintsClicked) {
      cell.isShown = true;
      renderCell(cellI, cellJ);
      setTimeout(function () {
         cell.isShown = false;
         renderCell(cellI, cellJ);
      }, 1000)
      gGame.hintsClicked = false;
   } else {
      cell.isShown = true;
      if (cell.isMine) {
         if (gGame.livesLeft > 0) {
            gGame.livesLeft--
            renderHeart();
            cell.isShown = false;
            alert('You hit a mine and lost a life!')
         } else {
            gGame.isOn = false;
         }
      }
      else if (!cell.minesAroundCount) {
         for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i >= gLevel.SIZE) continue;
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
               if (j < 0 || j >= gLevel.SIZE) continue;
               cellClicked(i, j);
            }
         }
      }
      renderCell(cellI, cellJ)
      checkGameOver()
   }
}

function cellMarked(i, j) {
   if (!gBoard[i][j].isShown) {
      gBoard[i][j].isMarked = !gBoard[i][j].isMarked;
      if (gBoard[i][j].isMarked) {
         if (gGame.markedCount < gLevel.MINES) gGame.markedCount++;
         else gBoard[i][j].isMarked = false;
      } else {
         gGame.markedCount--;
      }
      renderCell(i, j);
      renderMinesLeft();
      checkGameOver();
   }
}

function checkGameOver() {
   if (gGame.isOn) {
      var gameWon = true;
      for (var i = 0; (i < gLevel.SIZE) && gameWon; i++) {
         for (var j = 0; (j < gLevel.SIZE) && gameWon; j++) {
            if ((gBoard[i][j].isMine && !gBoard[i][j].isMarked) || (!gBoard[i][j].isMine && !gBoard[i][j].isShown)) {
               gameWon = false;
            }
         }
      }
      console.log(gameWon);
      if (gameWon) onGameWon()
   } else onGameLost()
}

function onGameWon() {
   var elBtn = document.querySelector('.restart');
   elBtn.innerText = WON;
   gGame.isOn = false;
}

function onGameLost() {
   var elBtn = document.querySelector('.restart');
   elBtn.innerText = LOST;
   for (var i = 0; i < gLevel.SIZE; i++) {
      for (var j = 0; j < gLevel.SIZE; j++) {
         if (!gBoard[i][j].isShown) {
            gBoard[i][j].isShown = true;
            renderCell(i, j);
         }
      }
   }
}

