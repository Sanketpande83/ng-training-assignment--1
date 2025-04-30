import React, { useEffect, useState } from "react";
import axios from "axios";

// URL of your backend API
const API_URL = 'http://localhost:8080/api/tasks';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        assignedTo: '',
        status: '',
        dueDate: '',
        priority: '',
        comments: ''
    });

    // Fetch tasks from the backend
    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching tasks!', error);
            });
    }, []);

    // Add a new task
    const addTask = () => {
        axios.post('http://localhost:8080/api/task', newTask)
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTask({
                    assignedTo: '',
                    status: '',
                    dueDate: '',
                    priority: '',
                    comments: ''
                });
            })
            .catch(error => {
                console.error('There was an error adding the task!', error);
            });
    };

    // Delete a task
    const deleteTask = (id) => {
        axios.delete(`http://localhost:8080/api/task/${id}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the task!', error);
            });
    };

    // Update a task
    const updateTask = (id) => {
        axios.put(`http://localhost:8080/api/task/${id}`, newTask)
            .then(response => {
                setTasks(tasks.map(task => task.id === id ? response.data : task));
                setNewTask({
                    assignedTo: '',
                    status: '',
                    dueDate: '',
                    priority: '',
                    comments: ''
                });
            })
            .catch(error => {
                console.error('There was an error updating the task!', error);
            });
    };

    return (
        <div>
            <h1>Task Manager</h1>

            {/* Add Task Form */}
            <div>
                <h2>Add New Task</h2>
                <input
                    type="text"
                    placeholder="Assigned To"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Due Date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Comments"
                    value={newTask.comments}
                    onChange={(e) => setNewTask({ ...newTask, comments: e.target.value })}
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            {/* Task List */}
            <div>
                <h2>Tasks</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <div>
                                <strong>{task.assignedTo}</strong> | {task.status} | {task.dueDate} | {task.priority} | {task.comments}
                            </div>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                            <button onClick={() => updateTask(task.id)}>Update</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskManager;
