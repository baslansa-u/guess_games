from flask import Flask, render_template, request, jsonify, session
from app.models import game
from app.models.game import get_random_word, check_guess, load_word_list

app = Flask(__name__, template_folder='app/templates', static_folder='app/static')

load_word_list()

answer = get_random_word()  

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_guess', methods=['POST'])
def check_guess_route():
    guess = request.json.get('guess', '').lower()

    if len(guess) != 5:
        return jsonify({'error': 'Please enter exactly 5 letters.'}), 400

    feedback = check_guess(guess, answer)

    if guess == answer:
        return jsonify({'result': 'Congratulations! You guessed the word correctly!', 'feedback': feedback})
    else:
        return jsonify({'result': 'Try again!', 'feedback': feedback})

@app.route('/get_answer', methods=['GET'])
def get_answer():
    return jsonify({'answer': answer.upper()})

@app.route('/restart_game', methods=['POST'])
def restart_game():
    global answer
    answer = get_random_word()
    return jsonify({'message': 'Game restarted!', 'answer': answer.upper()})

if __name__ == "__main__":
    app.run(debug=True)
