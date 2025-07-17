from flask import Flask, render_template, request, jsonify
from app.models.game import get_random_word, check_guess  # แก้ไขการนำเข้าจาก models.game

app = Flask(__name__, template_folder='app/templates', static_folder='app/static')

# คำที่ใช้ในเกม
answer = get_random_word()  # ใช้ฟังก์ชัน get_random_word เพื่อเลือกคำ

# หน้าแรก
@app.route('/')
def index():
    return render_template('index.html')

# API สำหรับตรวจสอบคำทาย
@app.route('/check_guess', methods=['POST'])
def check_guess_route():
    guess = request.json.get('guess', '').lower()

    if len(guess) != 5:
        return jsonify({'error': 'Please enter exactly 5 letters.'}), 400

    # ใช้ฟังก์ชัน check_guess จาก game.py
    feedback = check_guess(guess, answer)

    if guess == answer:
        return jsonify({'result': 'Congratulations! You guessed the word correctly!', 'feedback': feedback})
    else:
        return jsonify({'result': 'Try again!', 'feedback': feedback})

if __name__ == "__main__":
    app.run(debug=True)
