document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    if (player1 && player2) {
        document.getElementById('input-section').classList.add('hidden');
        document.getElementById('game-board').classList.remove('hidden');
        document.getElementById('message').innerText = `${player1}, you're up!`;

        startGame(player1, player2);
    } else {
        alert('Please enter names for both players.');
    }
});

function startGame(player1, player2) {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = player1;
    let currentMarker = 'X';
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];

    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            if (cell.innerText === '' && gameActive) {
                cell.innerText = currentMarker;
                board[parseInt(cell.id) - 1] = currentMarker;

                if (checkWinner(board, currentMarker)) {
                    document.getElementById('message').innerText = `${currentPlayer} congratulations you won!`;
                    gameActive = false;
                } else if (board.every(cell => cell !== '')) {
                    document.getElementById('message').innerText = `It's a draw!`;
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    currentMarker = currentMarker === 'X' ? 'O' : 'X';
                    document.getElementById('message').innerText = `${currentPlayer}, you're up!`;
                }
            }
        });
    });
}

function checkWinner(board, marker) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winningCombos.some(combo => 
        combo.every(index => board[index] === marker)
    );
}
