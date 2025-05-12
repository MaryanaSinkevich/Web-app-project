import React from 'react';
import { useAppContext } from '../context/AppContext';

const TaskSummary: React.FC = () => {
  const { state } = useAppContext();
  
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter(task => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;
  
  const highPriorityTasks = state.tasks.filter(task => !task.completed && task.priority === 'high').length;
  
  if (totalTasks === 0) return null;
  
  return (
    <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SummaryCard
          title="Total Tasks"
          value={totalTasks}
          className="bg-indigo-50 dark:bg-indigo-900/30"
          textColor="text-indigo-800 dark:text-indigo-300"
        />
        <SummaryCard
          title="Remaining"
          value={remainingTasks}
          className="bg-blue-50 dark:bg-blue-900/30"
          textColor="text-blue-800 dark:text-blue-300"
        />
        <SummaryCard
          title="High Priority"
          value={highPriorityTasks}
          className={highPriorityTasks > 0 ? "bg-red-50 dark:bg-red-900/30" : "bg-green-50 dark:bg-green-900/30"}
          textColor={highPriorityTasks > 0 ? "text-red-800 dark:text-red-300" : "text-green-800 dark:text-green-300"}
        />
      </div>
      
      {totalTasks > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-500"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {completedTasks} of {totalTasks} tasks completed ({Math.round((completedTasks / totalTasks) * 100)}%)
          </p>
        </div>
      )}
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: number;
  className?: string;
  textColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  className = "", 
  textColor = "text-gray-800 dark:text-gray-200" 
}) => {
  return (
    <div className={`p-3 rounded-lg ${className} transition-colors duration-300`}>
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{title}</p>
      <p className={`text-2xl font-semibold ${textColor}`}>{value}</p>
    </div>
  );
};

export default TaskSummary;