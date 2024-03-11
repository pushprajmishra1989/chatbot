from flask import Flask, json, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app,origins=['*'])

# Define the main dictionary containing user messages and corresponding bot responses
with open('responses.json', 'r') as file:
    chatbot_responses = json.load(file)

# Define the synonyms dictionary for handling variations of user messages

with open('synonyms.json', 'r') as file:
    synonyms = json.load(file)

# Define the route for receiving user messages and returning responses
@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_message = data['message'].lower()
    
    # Check if the user message exists in the main chatbot_responses dictionary
    if user_message in chatbot_responses:
        # If it exists, return the corresponding bot response
        bot_response = chatbot_responses[user_message]
    else:
        # Check if the user message exists in the synonyms dictionary
        for key, value in synonyms.items():
            if user_message in value:
                # If it exists, get the corresponding response from the main dictionary
                bot_response = chatbot_responses[key]
                break
        else:
            # If not found in either dictionary, return a default response
            bot_response = "I'm sorry, I don't understand that."
    
    # Return the bot response as JSON
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
