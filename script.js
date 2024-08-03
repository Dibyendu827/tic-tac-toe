const eachBtn = document.querySelectorAll('.eachBtn');
const showMsg = document.querySelector('.showMsg');
const resetBtn = document.querySelector('.resetBtn');

// Initial player sign
const playerAsign = 'O';
const playerBsign = 'X';

// Initial click count
let clickCount = 0;
// Initial player set as A is true
let currentPlayerA = true;
// Array of the situtions of win of an player
const winSituations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

// Add event listener on reset button
resetBtn.addEventListener('click', resetGame);

// Add event listener on each box or button of the game
eachBtn.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        if (currentPlayerA) {
            e.target.textContent = playerAsign;
            currentPlayerA = !currentPlayerA;
        }
        else {
            e.target.textContent = playerBsign;
            currentPlayerA = !currentPlayerA;
        }

        elem.disabled = true; // disable button which clicked
        clickCount++; // incease click count
        checkWin(); // check for win situations
        checkDraw(clickCount); // check for draw situations
    })
});

function checkWin() {
    for (let situation of winSituations) {
        // text content of the boxes of positions in winsituations array
        let position0 = eachBtn[situation[0]].textContent;
        let position1 = eachBtn[situation[1]].textContent;
        let position2 = eachBtn[situation[2]].textContent;
        // checks the three position must have any value
        if (position0 && position1 && position2) {
            if (position0 === position1 && position1 === position2) {
                showWinner(position0);
            }
        }
    }
}

function showWinner(winner) {
    showMsg.classList.remove('hide');
    showMsg.textContent = `Player ${winner} is Winner`;
    resetBtn.textContent = "New Game";
    for (let btn of eachBtn) {
        btn.disabled = true;
    }
}

function resetGame() {
    for (let btn of eachBtn) {
        btn.disabled = false;
        btn.textContent = "";
    }
    showMsg.textContent = "";
    resetBtn.textContent = "Reset";
    showMsg.classList.remove('draw');
    clickCount = 0;
}

function checkDraw(elem) {
    if (elem >= 9) {
        showMsg.textContent = `Match Draw`;
        resetBtn.textContent = "New Game";
        showMsg.classList.remove('hide');
        showMsg.classList.add('draw');
    }
}
