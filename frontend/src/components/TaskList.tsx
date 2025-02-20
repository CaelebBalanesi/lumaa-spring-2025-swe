import React from 'react';
import { useTasks } from '../hooks/useTasks';
import Popup from 'reactjs-popup'; 

const TaskList: React.FC = () => {
  const {
    tasks,
    newTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    setNewTaskTitle,
    updateTaskDescription,
    updateTaskTitle,
    setUpdateTaskDescription,
    setUpdateTaskTitle,
    error,
    createTask,
    updateTask,
    updateTaskSetup,
    deleteTask,
    completeTask
  } = useTasks();

  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>Your Tasks</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tasks.map(task => (
        <div
          key={task.id}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#454545',
            padding: '12px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '12px',
            width: '50%'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                textDecoration: task.isComplete ? 'line-through' : 'none',
                cursor: 'pointer',
                fontSize: '24px',
                fontWeight: 'bold'
              }}
              onClick={() => completeTask(task)}
            >
              {task.title}
            </span>
            {task.description != null && <p>{task.description}</p>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <Popup
              trigger={<button>Update</button>}
              position="right center"
              modal
              nested
              onOpen={() => updateTaskSetup(task)}
            >
              <div>
                <input
                  type="text"
                  placeholder="New task title"
                  value={updateTaskTitle}
                  onChange={e => setUpdateTaskTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="New task description"
                  value={updateTaskDescription}
                  onChange={e => setUpdateTaskDescription(e.target.value)}
                />
                <button onClick={() => updateTask(task)}>Update Task</button>
              </div>
            </Popup>
          </div>
        </div>
      ))}
      <div style={{ width: '50%', backgroundColor: '#454545', padding: '12px', borderRadius: '8px' }}>
        <input
          style={{ width: '80%' }}
          type="text"
          placeholder="New task title"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        <input
          style={{ width: '90%' }}
          type="text"
          placeholder="New task description"
          value={newTaskDescription}
          onChange={e => setNewTaskDescription(e.target.value)}
        />
        <button style={{ float: 'right' }} onClick={createTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TaskList;
