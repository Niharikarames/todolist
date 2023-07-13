import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Task {
  id: number;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const handleAddTask = () => {
    setShowModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingTask) {
      const updatedTask = { ...editingTask, title: formTitle, description: formDescription };
      const updatedTasks = tasks.map(task => (task.id === editingTask.id ? updatedTask : task));
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      const newTask = { id: Date.now(), title: formTitle, description: formDescription };
      const newTasks = [newTask, ...tasks];
      setTasks(newTasks);
    }
    setFormTitle('');
    setFormDescription('');
    setShowModal(false);
  };

  const handleEditTask = (task: Task) => {
    setFormTitle(task.title);
    setFormDescription(task.description);
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1><b>To-Do List</b></h1>
      <button onClick={handleAddTask}><b>Add Task</b></button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div>
              <button onClick={() => handleEditTask(task)}>
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrash} />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="modal">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={formTitle} onChange={e => setFormTitle(e.target.value)} />
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={formDescription} onChange={e => setFormDescription(e.target.value)} />
            <button type="submit">{editingTask ? 'Save' : 'Add'}</button>
            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
