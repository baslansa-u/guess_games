let attempts = 5;
let gameMessage = document.getElementById("gameMessage");
let feedbackContainer = document.getElementById("feedbackContainer");
let gameDialog = document.getElementById("gameDialog");
let dialogMessage = document.getElementById("dialogMessage");
let closeDialog = document.getElementById("closeDialog");
let restartGameButton = document.getElementById("restartGame");
let closeDialogBtn = document.getElementById("closeDialogBtn");
let guessHistory = [];

function checkGuess() {
    const guess = document.getElementById("guessInput").value.toLowerCase();

    if (guess.length !== 5) {
        alert("Please enter exactly 5 letters.");
        return;
    }

    fetch('/check_guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess: guess })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                attempts--;
                document.getElementById("attempts").textContent = attempts;

                let feedbackHtml = '';
                data.feedback.forEach(item => {
                    feedbackHtml += `<div class="letter ${item.color}">${item.letter}</div>`;
                });

                guessHistory.push({
                    guess: guess,
                    feedback: data.feedback
                });

                updateGuessHistory();

                if (data.result.includes("Congratulations")) {
                    dialogMessage.textContent = data.result;
                    gameDialog.style.display = "block";
                } else if (attempts === 0) {
                    dialogMessage.textContent = "Game Over! You've run out of attempts.";
                    gameDialog.style.display = "block";
                }

                document.getElementById("guessInput").value = '';
            }
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById("submitGuess").addEventListener("click", checkGuess);

document.getElementById("revealAnswer").addEventListener("click", function () {
    fetch('/get_answer', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            dialogMessage.textContent = `The answer is: ${data.answer}`;
            gameDialog.style.display = "block";
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById("guessInput").addEventListener("input", function () {
    gameMessage.classList.remove("show");
});

restartGameButton.addEventListener("click", function () {
    fetch('/restart_game', {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // รีเซ็ตค่าต่าง ๆ
                attempts = 5;
                guessHistory = [];
                document.getElementById("attempts").textContent = attempts;
                initializeGuessGrid();
                gameDialog.style.display = "none";
            } else {
                gameDialog.style.display = "none";
            }
        })
        .catch(error => console.error('Error:', error));
});

closeDialogBtn.addEventListener("click", function () {
    gameDialog.style.display = "none";
});

function updateGuessHistory() {
    const currentRow = 5 - attempts - 1;
    const boxes = document.querySelectorAll(`.letter-box[data-row="${currentRow}"]`);

    const lastGuess = guessHistory[guessHistory.length - 1];
    lastGuess.feedback.forEach((item, index) => {
        boxes[index].textContent = item.letter.toUpperCase();
        boxes[index].classList.remove('empty-box');
        boxes[index].classList.add(item.color);
    });
}

function initializeGuessGrid() {
    const guessGrid = document.getElementById("guessGrid");
    let gridHtml = '';

    for (let row = 0; row < 5; row++) {
        gridHtml += '<div class="guess-row">';
        for (let col = 0; col < 5; col++) {
            gridHtml += '<div class="letter-box empty-box" data-row="' + row + '" data-col="' + col + '"></div>';
        }
        gridHtml += '</div>';
    }

    guessGrid.innerHTML = gridHtml;
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', initializeGuessGrid);