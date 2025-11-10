import React from 'react';
import '../assets/style/priorityLevel.css';
import '../assets/style/priorityScale.css';

const PriorityScale = ({ priority, onChangePriority }) => (
  <div className="priority-scale">
    {Array.from({ length: 6 }, (_, i) => i + 1).map((level) => (
      <div
        key={level}
        className={`priority-level ${level <= priority ? 'active' : ''}`}
        onClick={() => onChangePriority(level)}
        title={`Priorité ${level}`}
      ></div>
    ))}
  </div>
);

export default PriorityScale;