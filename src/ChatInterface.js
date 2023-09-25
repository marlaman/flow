
import React, { useState } from 'react';
import axios from 'axios';

function ChatInterface({ initialGoal, onChatEnd }) {
    const [messages, setMessages] = useState([
        { role: "system", content: `You are an ADHD assistant tasked with breaking down a large goal into a smaller 30 min tasks
        
        
        
        The user has chosen the goal: '${initialGoal}'. Chat with the user about what they want, to break it down into 30-min tasks.
        
        Once you determine a set of small tasks, present it to the user and ask if they want to finalise or continue adding more tasks.

        If a user wants to see the final list, print 'You can now return to the goals page.' and output all the small tasks in json format:

        FINAL_TASKS_START[{"task": "Task 1 Title", "task_description" : "Task 1 Descriptipn"}, {"task": "Task 2 Title", "task_description" : "Task 2 Descriptipn"}]FINAL_TASKS_END


        Confirm this json output with the user and only then, exit


        ` },
        { role: "user", content: `Hey I want to create highly specific 30 min tasks toward my goal: '${initialGoal}. The tasks should be very clear.'

    ` }
    ],
    
    
    
    
    
    );
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }



    const fetchAIResponse = async (userMessage) => {
        try {
            const response = await axios.post('http://localhost:5001/chat_with_ai', {
                messages: [...messages, userMessage]
            });
            
            if (response.data.includes('You can now return to the goals page.')) {
                // Extract tasks from aiMessage (this extraction depends on how the AI presents the tasks)
                // For demonstration, I'm assuming a simple format but you might need to adjust this
                const startIndex = response.data.indexOf('FINAL_TASKS_START') + 'FINAL_TASKS_START'.length;
                const endIndex = response.data.indexOf('FINAL_TASKS_END');
                const tasksString = response.data.substring(startIndex, endIndex);
                
                const tasks = JSON.parse(tasksString);

                
                // Send tasks to Flask backend
                await axios.post('http://localhost:5001/store_tasks', {
                    tasks: tasks,
                    big_goal: initialGoal
                });
                
                // Call the onChatEnd callback (if provided) to handle end of chat in parent component
                if (onChatEnd) {
                    onChatEnd();
                }
            }

            return { role: 'system', content: response.data };
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return { role: 'system', content: 'Error communicating with AI. Please try again later.' };
        }
    }

    const handleSend = async () => {
        const userMessage = { role: 'user', content: inputValue };
        
        // Add the user's message to the chat
        setMessages(prevMessages => [...prevMessages, userMessage]);
        
        // Fetch AI's response
        const aiResponse = await fetchAIResponse(userMessage);
        setMessages(prevMessages => [...prevMessages, aiResponse]);

        // Check if chat needs to be ended based on AI's response
        if (aiResponse.content.includes("You can now return to the goals page.")) {
            onChatEnd();
        }
        
        // Clear the input field
        setInputValue('');
    }

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.role}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input value={inputValue} onChange={handleInputChange} />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default ChatInterface;
