import random
import requests
import os
from dotenv import load_dotenv

load_dotenv()

WORD_LIST = []

def load_word_list():
    global WORD_LIST
    if not WORD_LIST:
        url = os.getenv('API_URL')
        response = requests.get(url)
        
        if response.status_code == 200:
            words = response.json()
            WORD_LIST = [word['word'] for word in words if len(word['word']) == 5]
            
    return bool(WORD_LIST)

def get_random_word():
    global WORD_LIST
    if not WORD_LIST:
        if not load_word_list():
            return None
    return random.choice(WORD_LIST)

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
