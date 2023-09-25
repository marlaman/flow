import React, { useState } from 'react';

function GoalForm({ onSubmit }) {
  const [goal, setGoal] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (goal.trim() !== '') {
      onSubmit(goal);
      setGoal('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="goal-input">What is your large life goal?</label>
      <input
        id="goal-input"
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button type="submit">Generate Tasks</button>
    </form>
  );
}

export default GoalForm;
