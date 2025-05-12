import React from 'react';
import { useAppContext } from '../context/AppContext';
import { FilterPriority, FilterStatus } from '../types';

const TaskFilters: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const setStatusFilter = (status: FilterStatus) => {
    dispatch({ type: 'SET_FILTER_STATUS', status });
  };

  const setPriorityFilter = (priority: FilterPriority) => {
    dispatch({ type: 'SET_FILTER_PRIORITY', priority });
  };

  const statusOptions: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions: { value: FilterPriority; label: string }[] = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex flex-col space-y-1">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Status</span>
        <div className="flex space-x-1">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                state.filter.status === option.value
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 font-medium'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Priority</span>
        <div className="flex space-x-1">
          {priorityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setPriorityFilter(option.value)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                state.filter.priority === option.value
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 font-medium'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;