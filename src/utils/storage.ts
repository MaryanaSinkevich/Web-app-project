import { AppState, Task } from '../types';

const STORAGE_KEY = 'taskify-state';

export const defaultState: AppState = {
  tasks: [],
  filter: {
    status: 'all',
    priority: 'all',
  },
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
};

export const loadState = (): AppState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return defaultState;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state:', error);
    return defaultState;
  }
};

export const saveState = (state: AppState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const addTask = (tasks: Task[], title: string, priority: Task['priority']): Task[] => {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    priority,
    createdAt: Date.now(),
  };
  return [...tasks, newTask];
};

export const toggleTask = (tasks: Task[], id: string): Task[] => {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
};

export const deleteTask = (tasks: Task[], id: string): Task[] => {
  return tasks.filter((task) => task.id !== id);
};

export const updateTaskPriority = (
  tasks: Task[],
  id: string,
  priority: Task['priority']
): Task[] => {
  return tasks.map((task) => (task.id === id ? { ...task, priority } : task));
};

export const filterTasks = (
  tasks: Task[],
  statusFilter: AppState['filter']['status'],
  priorityFilter: AppState['filter']['priority']
): Task[] => {
  return tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !task.completed) ||
      (statusFilter === 'completed' && task.completed);
    
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesStatus && matchesPriority;
  });
};