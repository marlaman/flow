import React from 'react';
import {Button, TextField, Card, CardContent, Typography } from '@mui/material';

function LandingPage({ bigGoals, handleShowTasks, isTasksModalOpen, currentGoalTasks, handleCloseTasksModal, setSelectedGoalForChat }) {
    // ... retain the relevant parts from App.js for the landing page here

    return (
        <>
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
        </>
    );
}

export default LandingPage;
