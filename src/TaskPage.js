import React, { useState, useEffect } from 'react';
import axios from 'axios';

const tileStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    width: '300px',
    backgroundColor: 'orange',
    color: 'white',
    margin: 'auto',
    marginTop: '15%',
    fontSize: '24px',
    padding: '20px',
    borderRadius: '15px',
};

function TaskPage() {
    const [task, setTask] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5001/api/random_task')
            .then(response => {
                setTask(response.data);
            })
            .catch(error => {
                console.error('Error fetching goals:', error);
            });
           
    
      }, []);

    return (
        <div>
                <div style={tileStyle}>
                    <div style={{ marginBottom: '20px' }}>{task.task}</div>
                    <div>{task.task_description}</div>
                </div>

        </div>
    );
}

export default TaskPage;
