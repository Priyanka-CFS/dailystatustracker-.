import React, { useState } from 'react';
import './App.css'; // Link to your CSS file

function TaskApp() {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track the task being edited
  const [newTask, setNewTask] = useState({
    name: '',
    category: 'Completed',
    description: '',
    startDate: currentDate,
    endDate: currentDate,
    status: 'Done',
    progress: 0,
    remarks: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) : value,
    }));
  };

  // Add or Update Task
  const handleAddTask = () => {
    if (newTask.description.trim() !== '' && newTask.name.trim() !== '') {
      if (editingIndex === null) {
        setTasks([...tasks, newTask]);
      } else {
        const updatedTasks = tasks.map((task, index) =>
          index === editingIndex ? newTask : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
      }

      // Clear form after add/update
      setNewTask({
        name: '',
        category: 'Completed',
        description: '',
        startDate: currentDate,
        endDate: currentDate,
        status: 'Done',
        progress: 0,
        remarks: '',
      });
    } else {
      alert('Please fill in both your name and task description.');
    }
  };

  // Set task details to edit
  const handleEditTask = (index) => {
    setEditingIndex(index);
    setNewTask(tasks[index]); // Populate form with the selected task
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewTask({
      name: '',
      category: 'Completed',
      description: '',
      startDate: currentDate,
      endDate: currentDate,
      status: 'Done',
      progress: 0,
      remarks: '',
    });
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><a href="#Task Tracker" className="link">Task Tracker</a></li>
        </ul>
      </nav>

      <div className="task-container">
        <h1>{editingIndex === null ? `Daily Status Update for ${currentDate}` : `Edit Task for ${currentDate}`}</h1>

        <div className="input-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={newTask.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleInputChange}
          />
          <select name="category" value={newTask.category} onChange={handleInputChange}>
            <option value="Completed">Completed</option>
            <option value="Work in Progress">Work in Progress</option>
            <option value="Planned">Planned</option>
          </select>
          <input
            type="date"
            name="startDate"
            value={newTask.startDate}
            onChange={handleInputChange}
            disabled
          />
          <input
            type="date"
            name="endDate"
            value={newTask.endDate}
            onChange={handleInputChange}
          />
          <select name="status" value={newTask.status} onChange={handleInputChange}>
            <option value="Done">Done</option>
            <option value="In Progress">In Progress</option>
            <option value="Planned">Planned</option>
          </select>
          <input
            type="number"
            name="progress"
            placeholder="Progress (%)"
            value={newTask.progress}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="remarks"
            placeholder="Remarks/Blockers"
            value={newTask.remarks}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTask}>
            {editingIndex === null ? 'Add Task' : 'Update Task'}
          </button>
          {editingIndex !== null && (
            <button
              style={{ marginLeft: '10px', backgroundColor: '#f44336', color: 'white' }}
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <div className="task-list">
        <h2>Today's Task Updates</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Remarks/Blockers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={index}
                className={task.category.replace(' ', '-') /* Class for row color */}
                style={{
                  backgroundColor:
                    task.category === 'Work in Progress'
                      ? 'lightyellow'
                      : task.category === 'Completed' || task.category === 'Done'
                      ? 'lightgreen'
                      : task.category === 'Planned'
                      ? 'lightcoral'
                      : 'white',
                }}
              >
                <td>{task.name}</td>
                <td>{task.category}</td>
                <td>{task.description}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>{task.status}</td>
                <td>{task.progress}%</td>
                <td>{task.remarks}</td>
                <td>
                  <button onClick={() => handleEditTask(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskApp;
