import React, { useState } from 'react';
import '../assets/style/tasklist.css';
import TaskItem from './TaskItem.component.jsx';

const TaskList = ({ tasks, onChangePriority, onCompleteTask, title }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => setFilter(e.target.value);

  // Filtrer les tâches
  const filteredTasks = tasks.filter(({ description }) =>
    description.toLowerCase().includes(filter.toLowerCase())
  );

  // Trier les tâches par priorité (ordre décroissant)
  const sortedTasks = filteredTasks.sort((a, b) => b.priority - a.priority);

  // Calculer le nombre de tâches et la durée totale
  const totalTasks = tasks.length;
  const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);

  return (
    <div className="task-list-container">
      <h3>{title}</h3>
      {/* Affichage du nombre de tâches et de la durée totale */}
      <div className="task-summary">
        <p>Nombre de tâches en cours : {totalTasks}</p>
        <p>Durée totale : {totalDuration} minutes</p>
      </div>
      <input
        type="text"
        className="filter-input"
        placeholder="Filtre"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul className="task-list">
        {sortedTasks.map((task) => (
          <li key={task.id} className="task-item">
            <TaskItem
              task={task}
              onComplete={onCompleteTask}
              onChangePriority={onChangePriority}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;