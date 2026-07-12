'use client';

import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
      title
      completed
    }
  }
`;

const TOGGLE_TASK = gql`
  mutation ToggleTask($id: ID!) {
    toggleTaskCompletion(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export default function TaskList() {
  const { data, loading, error } = useQuery(GET_TASKS, { pollInterval: 2000 }); // Real-time polling
  const [createTask] = useMutation(CREATE_TASK, { refetchQueries: [{ query: GET_TASKS }] });
  const [toggleTask] = useMutation(TOGGLE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK, { refetchQueries: [{ query: GET_TASKS }] });
  const [newTask, setNewTask] = useState('');

  if (loading && !data) return <div className="text-white animate-pulse">Loading Tasks...</div>;
  if (error) return <div className="text-red-400">Error loading tasks: {error.message}</div>;

  return (
    <div className="w-full max-w-lg mt-8 bg-white/10 p-6 rounded-2xl backdrop-blur-lg border border-white/20">
      <h2 className="text-2xl font-semibold text-white mb-4">Your Tasks</h2>
      
      <div className="flex mb-6">
        <input 
          className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newTask) {
              createTask({ variables: { title: newTask } });
              setNewTask('');
            }
          }}
        />
        <button 
          onClick={() => {
            if (newTask) {
              createTask({ variables: { title: newTask } });
              setNewTask('');
            }
          }}
          className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-r-lg transition-colors"
        >
          Add
        </button>
      </div>

      <button 
        onClick={async () => {
          if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
              new Notification('ProHabit', { body: 'Push notifications are now enabled!' });
            }
          }
        }}
        className="w-full mb-6 py-2 text-sm text-indigo-300 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/10 transition-colors"
      >
        🔔 Enable Push Notifications
      </button>

      <ul className="space-y-3">
        {data?.tasks?.map((task: any) => (
          <li key={task.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTask({ variables: { id: task.id } })}
                className="w-5 h-5 text-indigo-500 rounded border-gray-300 focus:ring-indigo-500 bg-transparent"
              />
              <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                {task.title}
              </span>
            </div>
            <button 
              onClick={() => deleteTask({ variables: { id: task.id } })}
              className="text-red-400 hover:text-red-300 text-sm font-semibold"
            >
              Delete
            </button>
          </li>
        ))}
        {data?.tasks?.length === 0 && (
          <li className="text-gray-400 text-center py-4">No tasks yet. Enjoy your day!</li>
        )}
      </ul>
    </div>
  );
}
