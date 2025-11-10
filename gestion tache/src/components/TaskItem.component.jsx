import React from 'react';
import PriorityScale from './PriorityScale.component.jsx';
import '../assets/style/task.css';
import '../assets/style/doneButton.css';

const TaskItem = ({ task: { id, description, duration, priority }, onComplete, onChangePriority }) => {
  const handleComplete = () => onComplete(id);
  const handlePriorityChange = (newPriority) => onChangePriority(id, newPriority);

  return (
    <div className="task-item">
      <p className="task-description">
        {description} ({duration}mn)
      </p>
      <PriorityScale priority={priority} onChangePriority={handlePriorityChange} />
      <button className="complete-button" onClick={handleComplete}>
        ✓
      </button>
    </div>
  );
};
export default TaskItem;