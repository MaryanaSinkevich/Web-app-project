import React from 'react';
import { CheckCircle, Circle, Trash2, MoreHorizontal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Task } from '../types';
import { getPriorityTextClass } from './TaskForm';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { dispatch } = useAppContext();
  const [showMenu, setShowMenu] = React.useState(false);
  
  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TASK', id: task.id });
  };
  
  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', id: task.id });
  };
  
  const handleChangePriority = (priority: Task['priority']) => {
    dispatch({ type: 'UPDATE_PRIORITY', id: task.id, priority });
    setShowMenu(false);
  };
  
  return (
    <div 
      className={`group p-4 rounded-lg border ${
        task.completed 
          ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      } shadow-sm hover:shadow-md transition-all duration-200 flex items-start justify-between`}
    >
      <div className="flex items-start space-x-3 flex-1">
        <button
          onClick={handleToggle}
          className="flex-shrink-0 mt-1"
        >
          {task.completed ? (
            <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <p 
            className={`text-sm sm:text-base ${
              task.completed 
                ? 'text-gray-500 dark:text-gray-400 line-through' 
                : 'text-gray-800 dark:text-gray-200'
            } transition-colors duration-200`}
          >
            {task.title}
          </p>
          <div className="flex items-center mt-1 space-x-2">
            <span className={`text-xs ${getPriorityTextClass(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} priority
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleDelete}
          className="p-1 rounded-full text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 top-8 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              Change priority
            </div>
            {(['low', 'medium', 'high'] as const).map(priority => (
              <button
                key={priority}
                onClick={() => handleChangePriority(priority)}
                className={`w-full text-left px-3 py-2 text-sm ${
                  task.priority === priority 
                    ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                } text-gray-700 dark:text-gray-300 transition-colors`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;