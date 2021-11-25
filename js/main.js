'use strict'

var gBoard = []

var gLevel = {
   SIZE: 4,
   MINES: 2
}

var gGame = {
   isOn: false,
   shownCount: 0,
   markedCount: 0,
   secsPassed: 0
}

const MINE = '💣';
const FLAG = '🚩';



init()
function init() {
   gBoard = createBoard();
   setMinesNegsCount();
   gGame.isOn = true;
   gGame.shownCount = 0;
   gGame.markedCount = 0,
      gGame.secsPassed = 0;
   renderBoard(gBoard);
}

function createBoard() {
   for (var i = 0; i < gLevel.SIZE; i++) {
      gBoard[i] = [];
      for (var j = 0; j < gLevel.SIZE; j++) {
         gBoard[i][j] = {
            minesAroundCount: 0,
            isShown: true,
            isMine: false,
            isMarked: false
         };
         if ((i === 2 && j === 3) || (i === 0 && j === 2)) {
            gBoard[i][j].isMine = true;
            gBoard[i][j] = MINE;
         }
      }
   }
   return gBoard;
}

console.log(createBoard());
console.table(createBoard());


function renderBoard() {
   var strHTML = '';
   for (var i = 0; i < gBoard.length; i++) {
      strHTML += `<tr class="board-row">`;
      for (var j = 0; j < gBoard[0].length; j++) {
         var className = 'empty';
         var tdText = '';
         var cell = gBoard[i][j];
         if (cell.isMarked) {
            className = 'marked';
            tdText = FLAG;
         }
         else if (!cell.isShown) className = 'hide';
         else if (cell.isMine) {
            className = 'mine';
            tdText = MINE;
         } else if (cell.minesAroundCount) {
            className = 'neg';
            tdText = cell.minesAroundCount
         }

         strHTML += `<td class="cell ${className}" onclick="cellClicked(this, ${i}, ${j})">${tdText}</td>`;
      }
      strHTML += `</tr>`;
   }
   var elCells = document.querySelector('.board-cells');
   elCells.innerHTML = strHTML;
}


function setMinesNegsCount() {
   for (var i = 0; i <= gBoard.length; i++) {
      for (var j = 0; j <= gBoard[0].length; j++) {
         console.log(gBoard[i][j]);
         if (gBoard[i][j] !== MINE) {
            gBoard[i][j].minesAroundCount = getMinesAroundCount(i, j);
         }
      }
   }
}

function getMinesAroundCount(cellI, cellJ) {
   var count = 0;
   for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue;
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
         if (i === cellI && j === cellJ) continue;
         if (j < 0 || j >= gBoard[i].length) continue;
         if (gBoard[i][j] === MINE) count++;
      }
   }
   return count
}

function cellClicked(elCell, i, j) {
   var cell = gBoard[i][j];
   if (cell === MINE) gGame.isOn = false;
}

function cellMarked(elCell) {

}

function checkGameOver() {
   elBtn = document.querySelector('.restart');
   elBtn.innerText = '🙁';
}