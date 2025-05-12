export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type FilterPriority = 'all' | 'low' | 'medium' | 'high';

export interface AppState {
  tasks: Task[];
  filter: {
    status: FilterStatus;
    priority: FilterPriority;
  };
  darkMode: boolean;
}