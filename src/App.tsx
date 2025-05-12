import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-6">
            <TaskSummary />
            
            <div className="space-y-4">
              <TaskForm />
              <TaskFilters />
            </div>
            
            <TaskList />
          </div>
        </main>
        
        <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Taskify &copy; {new Date().getFullYear()} • Your tasks, beautifully organized</p>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;