import React from 'react';
import '../assets/style/addtask.css';

const AddTask = ({
  newTaskDescription,
  newTaskDuration,
  setNewTaskDescription,
  setNewTaskDuration,
  addTask,
}) => (
  <div className="add-task">
    <input
      type="text"
      placeholder="Description"
      value={newTaskDescription}
      onChange={(e) => setNewTaskDescription(e.target.value)}
    />
    <input
      type="number"
      placeholder="Durée (mn)"
      value={newTaskDuration}
      onChange={(e) => setNewTaskDuration(e.target.value)}
    />
    <button onClick={addTask}>Ajouter</button>
  </div>
);

export default AddTask;