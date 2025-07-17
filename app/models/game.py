import random

word_list = ["apple"]

def get_random_word():
    return random.choice(word_list)

def check_guess(guess, answer):
    feedback = []
    for i in range(5):
        if guess[i] == answer[i]:
            feedback.append({'letter': guess[i], 'color': 'green'})
        elif guess[i] in answer:
            feedback.append({'letter': guess[i], 'color': 'yellow'})
        else:
            feedback.append({'letter': guess[i], 'color': 'black'})
    
    return feedback
