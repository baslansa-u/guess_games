let attempts = 6;
let gameMessage = document.getElementById("gameMessage");
let feedbackContainer = document.getElementById("feedbackContainer");
let gameDialog = document.getElementById("gameDialog");
let dialogMessage = document.getElementById("dialogMessage");
let closeDialog = document.getElementById("closeDialog");
let restartGameButton = document.getElementById("restartGame");
let closeDialogBtn = document.getElementById("closeDialogBtn");

// ฟังก์ชันสำหรับตรวจสอบคำที่ทาย
function checkGuess() {
    const guess = document.getElementById("guessInput").value.toLowerCase();

    // ตรวจสอบว่า length ของคำทายถูกต้องหรือไม่
    if (guess.length !== 5) {
        alert("Please enter exactly 5 letters.");
        return;
    }

    // ส่งคำทายไปที่ Flask server
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
                // ปรับจำนวนครั้งที่เหลือ
                attempts--;
                document.getElementById("attempts").textContent = attempts;

                // แสดงผลการทาย
                let feedbackHtml = '';
                data.feedback.forEach(item => {
                    feedbackHtml += `<div class="letter ${item.color}">${item.letter}</div>`;
                });
                feedbackContainer.innerHTML = feedbackHtml;

                // แสดงข้อความเกม
                if (data.result.includes("Congratulations")) {
                    // แสดงข้อความแสดงความยินดี
                    dialogMessage.textContent = data.result;
                    gameDialog.style.display = "block"; // แสดง dialog
                } else if (attempts === 0) {
                    // แสดงข้อความเมื่อหมดโอกาสทาย
                    dialogMessage.textContent = "Game Over! You've run out of attempts.";
                    gameDialog.style.display = "block"; // แสดง dialog
                }

                // ล้างฟิลด์ input
                document.getElementById("guessInput").value = '';
            }
        })
        .catch(error => console.error('Error:', error));
}

// เพิ่ม event listener ให้กับปุ่ม
document.getElementById("submitGuess").addEventListener("click", checkGuess);

// เคลียร์ข้อความผลลัพธ์ทุกครั้งที่ผู้ใช้กรอกใหม่
document.getElementById("guessInput").addEventListener("input", function () {
    gameMessage.classList.remove("show");
});

// ฟังก์ชันเริ่มเกมใหม่
restartGameButton.addEventListener("click", function () {
    // รีเฟรชหน้าใหม่เพื่อเริ่มเกมใหม่
    window.location.reload();
});

// ฟังก์ชันปิด dialog
closeDialogBtn.addEventListener("click", function () {
    gameDialog.style.display = "none";  // ซ่อน dialog
});

// ฟังก์ชันปิด dialog เมื่อคลิกที่ปุ่มปิด (X)
closeDialog.addEventListener("click", function () {
    gameDialog.style.display = "none";  // ซ่อน dialog
});
