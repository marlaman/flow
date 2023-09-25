import React from 'react';
import PropTypes from 'prop-types';

function TaskDisplay({ tasks }) {
  if (tasks.length === 0) {
    return <p>No tasks generated yet. Please enter a goal.</p>;
  }

  return (
    <div>
      <h2>Generated Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

TaskDisplay.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default TaskDisplay;
