import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AppState, FilterPriority, FilterStatus, Task } from '../types';
import { addTask, defaultState, deleteTask, loadState, saveState, toggleTask, updateTaskPriority } from '../utils/storage';

type AppAction =
  | { type: 'ADD_TASK'; title: string; priority: Task['priority'] }
  | { type: 'TOGGLE_TASK'; id: string }
  | { type: 'DELETE_TASK'; id: string }
  | { type: 'UPDATE_PRIORITY'; id: string; priority: Task['priority'] }
  | { type: 'SET_FILTER_STATUS'; status: FilterStatus }
  | { type: 'SET_FILTER_PRIORITY'; priority: FilterPriority }
  | { type: 'TOGGLE_DARK_MODE' };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: addTask(state.tasks, action.title, action.priority),
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: toggleTask(state.tasks, action.id),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: deleteTask(state.tasks, action.id),
      };
    case 'UPDATE_PRIORITY':
      return {
        ...state,
        tasks: updateTaskPriority(state.tasks, action.id, action.priority),
      };
    case 'SET_FILTER_STATUS':
      return {
        ...state,
        filter: {
          ...state.filter,
          status: action.status,
        },
      };
    case 'SET_FILTER_PRIORITY':
      return {
        ...state,
        filter: {
          ...state.filter,
          priority: action.priority,
        },
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, loadState());

  useEffect(() => {
    saveState(state);
    
    // Apply dark mode class to document
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};