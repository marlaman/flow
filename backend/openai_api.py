import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions'

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {OPENAI_API_KEY}'
}

def generate_tasks(goal):
    data = {
        'prompt': f'Generate a list of 30-minute tasks to achieve the goal: {goal}',
        'max_tokens': 200
    }

    response = requests.post(OPENAI_API_URL, headers=headers, json=data)

    if response.status_code != 200:
        raise Exception('Failed to generate tasks from OpenAI API')

    tasks = response.json()['choices'][0]['text'].strip().split('\n')

    return tasks
