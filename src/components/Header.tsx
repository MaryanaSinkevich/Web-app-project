import React from 'react';
import { CheckCircle, Moon, Sun } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();
  
  return (
    <header className="py-6 px-4 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 transition-colors duration-300">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Taskify</h1>
        </div>
        
        <button
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label={state.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {state.darkMode ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;