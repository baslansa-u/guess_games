# My Guessing Game
A simple word guessing game built using Python and Flask, allowing users to guess a 5-letter word. 
This game includes an API integration for random word generation.

<img width="400" height="500" alt="image" src="https://github.com/user-attachments/assets/939b6f2f-af96-4c32-a6aa-1529713eb691" />

## Features
- Random 5-letter word generated via external API (Datamuse API)
- Guess feedback with color-coded responses (Green for correct, Yellow for wrong position, Black for incorrect letters)
- Session-based game where players can make up to 5 attempts
- REST API to start a new game

## Installation

1. Clone this repository:  
   `git clone https://github.com/username/guessing-game.git`

2. Create a virtual environment:  
   `python -m venv .venv`

3. Activate the virtual environment:
   - On macOS:  
     `source .venv/bin/activate`
   - On Windows:  
     `.venv\Scripts\activate`

4. Install the required dependencies:  
   `pip install -r requirements.txt`

5. Set up environment variables for the Datamuse API:  
   Follow the instructions [here](https://www.datamuse.com/api/) to get your API key and add it to your environment.

  
## Acknowledgements
Datamuse API for word suggestions
Flask for building the backend

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
