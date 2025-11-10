import React, { useState, useEffect } from 'react';
import AddTask from './AddTask.component.jsx';
import TaskList from './TaskList.component.jsx';
import tasksData from '../data/tasksData.js';
import '../assets/style/taskApp.css';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDuration, setNewTaskDuration] = useState('');

  useEffect(() => {
    const enrichedTasks = tasksData.map((task) => ({
      ...task,
      priority: task.priority ?? 1,
    }));
    setTasks(enrichedTasks);
  }, []);

  const handleAddTask = () => {
    if (newTaskDescription && newTaskDuration) {
      const newTask = {
        id: `T${tasks.length + 1}`,
        description: newTaskDescription,
        duration: parseInt(newTaskDuration, 10),
        priority: 1,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskDescription('');
      setNewTaskDuration('');
    }
  };

  const completeTask = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);
  };

  const changeTaskPriority = (taskId, newPriority) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      )
    );
  };

  return (
    <div className="taskApp">
      <AddTask
        newTaskDescription={newTaskDescription}
        newTaskDuration={newTaskDuration}
        setNewTaskDescription={setNewTaskDescription}
        setNewTaskDuration={setNewTaskDuration}
        addTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onCompleteTask={completeTask}
        onChangePriority={changeTaskPriority}
        title="Tâches à faire"
      />
      <div className="completed-section">
        <h3
          className="completed-title"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          Tâches terminées {showCompleted ? '▲' : '▼'}
        </h3>
        <div
          style={{
            maxHeight: showCompleted ? '500px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}
        >
          {showCompleted && (
            <ul>
              {completedTasks.map((task) => (
                <li key={task.id}>
                  {task.description} ({task.duration}mn)
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskApp;