

import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ChatInterface from './ChatInterface';
import Navbar from './NavBar';  // Import the chat interface component
import TaskPage from './TaskPage';


    // handleTileHover(event) {
    //     event.target.style.backgroundColor = "#e0e0e0";  // Light gray when hovered
    // }
    
    // handleTileLeave(event) {
    //     event.target.style.backgroundColor = "";  // Reset to original color when not hovered
    // }





function MainContent() {

  useEffect(() => {
    axios.get('http://localhost:5001/goals')
        .then(response => {
            setBigGoals(response.data.goals);
        })
        .catch(error => {
            console.error('Error fetching goals:', error);
        });
       

  }, []);

  const [bigGoals, setBigGoals] = useState([]);
  const [goal, setGoal] = useState('');
  const [goal_desc, setGoalDesc] = useState('');
  const [goal_comments, setGoalComments] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedGoalForChat, setSelectedGoalForChat] = useState(null);  // Track the selected goal for chat
  const [tasksCounts, setTasksCounts] = useState({});
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [currentGoalTasks, setCurrentGoalTasks] = useState([]);
  const [, forceUpdate] = useState(0);
  

  const handleSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:5001/api/goals', { big_goal: goal, goal_desc : goal_desc , goal_comments : goal_comments });
        console.log(response.data.message);
    } catch (error) {
        console.error('Error submitting goal:', error);
    }
};

const handleShowTasks = (tasks) => {
  setCurrentGoalTasks(tasks);
  setIsTasksModalOpen(true);
};

const handleCloseTasksModal = (event) => {
  event.stopPropagation();
  console.log("Closing Modal");
  setIsTasksModalOpen(false);
};


  const handleChatEnd = () => {
    setSelectedGoalForChat(null);  // Reset the selected goal to navigate back to the goals page
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    
      <h1>Goal Planner</h1>
      {selectedGoalForChat ? (
        <ChatInterface initialGoal={selectedGoalForChat} onChatEnd={handleChatEnd} />
      ) : (
        <>
          <TextField
            style={{width: "100%",height: "4em", margin: "20px auto",alignItems: 'center'}}
            variant="outlined"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter your goal"
          />
          <TextField
            style={{width: "100%",height: "4em", margin: "20px auto",alignItems: 'center'}}
            variant="outlined"
            value={goal_desc}
            onChange={(e) => setGoalDesc(e.target.value)}
            placeholder="Describe your goal"
          />
          <TextField
            style={{width: "100%",height: "4em", margin: "20px auto",alignItems: 'center'}}
            variant="outlined"
            value={goal_comments}
            onChange={(e) => setGoalComments(e.target.value)}
            placeholder="Add any additional comments about the goal"
          />
          <Button variant="contained" style={{ display : "grid",borderRadius: '25px', fontSize: '1em', width: '150px', alignSelf: 'center',alignItems: 'center',margin : "20px", fontWeight:"light", opacity: "80%"}} color="primary"  onClick={handleSubmit}>Submit</Button>
          <div style={{ width: "100%", alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ margin: '20px 0' }}>Goals Added</h2>
            <div style={{ width : "70%", display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {bigGoals.map((taskObj, index) => (
              <Card key={index} style = {{width : "45%",  textTransform: 'none',// Adjusted for 3 cards per row
              height: '200px',
              backgroundColor: '#FFD580',  // Light shaded color
              boxShadow: '0 3px 5px 2px rgba(240, 240, 240, .5)',
              borderRadius: '10px',display : "flex",margin : "20px"}} 
              >
                <CardContent>
                    <Typography variant="h6" style={{fontWeight: "bold", marginBottom: "10px"}}>{taskObj.big_goal}</Typography>
                    <button onClick={() => handleShowTasks(taskObj.small_goals)}>
                      {taskObj.small_goals.length} tasks
                      {isTasksModalOpen && (
                        <div style={{ 
                            position: 'fixed', 
                            top: '10%', 
                            left: '10%', 
                            width: '80%', 
                            height: '80%', 
                            backgroundColor: 'white', 
                            boxShadow: '0px 0px 15px rgba(0,0,0,0.5)', 
                            overflowY: 'scroll' 
                        }}>
                            {currentGoalTasks.map(task => (
                                <div key={task._id}>
                                    {task.task} - {task.task_description}
                                </div>
                            ))}
                            <button onClick={handleCloseTasksModal}>Close</button>
                        </div>
                    )}
                    </button>
                    <Button variant="contained" style={{textTransform: 'none',borderRadius: '10px', fontSize: '0.8em', width: '200px',height : "40px",top : "55%", fontWeight: "bold"}} color="secondary" onClick={() => setSelectedGoalForChat(taskObj.big_goal)}>Start Chat with AI &#129302;</Button>
                </CardContent>
              </Card>
            ))}
             </div>
          </div>
        </>
        
      )}
   
  </div>
  );
}

function App() {
  // ... rest of your App component logic ...

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Navbar />
        <Routes>
          <Route path="/taskpage" element={<TaskPage />} />
          <Route path="/" element={<MainContent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
