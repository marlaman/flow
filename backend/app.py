
from flask import Flask, request, jsonify
from pymongo.server_api import ServerApi
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os
import openai
from random import choice


from pymongo import MongoClient

openai.api_key = os.environ['OPENAI_API_KEY']
mp = os.environ['MONGO_DB_PASS']
uri = "mongodb+srv://marlaa:{}@cluster0.7luy8zi.mongodb.net/?retryWrites=true&w=majority".format(mp)
client = MongoClient(uri)
db = client['goal_planner']
goals_collection = db['goals']

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/chat_with_ai', methods=['POST','GET'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type'])
def chat_with_ai():
    print("Enteredddd")
    data = request.get_json(force=True)
    messages = data.get('messages', [])
    print("Received messages:", messages)

    
    # Setting up OpenAI API key
    openai.api_key = "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"
    
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=messages
    )
    
    return jsonify(response['choices'][0]['message']['content'])

@app.route('/store_tasks', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type'])
def store_tasks():
    tasks = request.json.get('tasks')
    big_goal = request.json.get('big_goal')
    
    
    # Store tasks in MongoDB under the respective big goal
    goals_collection.update_one({'big_goal': big_goal}, {"$set": {'small_goals': tasks}})
    
    return jsonify({"status": "success"})

@app.route('/api/goals', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type'])
def add_goal():
    data = request.json
    big_goal = data.get('big_goal')
    goal_desc = data.get('goal_desc')
    goal_comments = data.get('goal_comments')
    
    # Insert the big_goal into MongoDB with an empty 'small_goals' list
    goals_collection.insert_one({'big_goal': big_goal, 'goal_description' : goal_desc , 'goal_comments' : goal_comments , 'small_goals': []})
    
    return jsonify({'message': 'Goal added successfully'}), 201

@app.route('/goals', methods=['GET', 'POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type'])
def get_goals():
    goals = list(goals_collection.find({}, {'_id': False}))
    return jsonify({"goals": goals})


@app.route('/api/random_task', methods=['GET'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type'])
def get_random_task():
    # Fetch all the goals
    goals = list(goals_collection.find({}, {'_id': False}))
    
    # Extract all the small tasks from the goals
    all_small_tasks = [task for goal in goals for task in goal['small_goals']]
    
    # Return a random task
    if all_small_tasks:
        return jsonify(choice(all_small_tasks))
    else:
        return jsonify({"message": "No tasks available."})


if __name__ == '__main__':
    app.run(port=5001, debug=False)
