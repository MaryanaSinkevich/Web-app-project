import React from 'react';
import { useAppContext } from '../context/AppContext';
import { filterTasks } from '../utils/storage';
import TaskItem from './TaskItem';
import { ListX } from 'lucide-react';

const TaskList: React.FC = () => {
  const { state } = useAppContext();
  const filteredTasks = filterTasks(
    state.tasks,
    state.filter.status,
    state.filter.priority
  );

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <ListX className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" />
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-1">No tasks found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          {state.tasks.length === 0
            ? "You haven't created any tasks yet. Add one to get started!"
            : "No tasks match your current filters."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;