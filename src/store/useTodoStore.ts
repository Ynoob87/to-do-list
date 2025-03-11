import { Todo } from '@/types/todo';
import debounce from 'lodash/debounce';
import { create } from 'zustand';

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';

  // Core Actions
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  initializeTodos: (todos: Todo[]) => void;

  // Simple Filter
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

// Debounced save function
const saveToLocalStorage = debounce((todos: Todo[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos:', error);
    }
  }
}, 1000);

export const useTodoStore = create<TodoStore>()((set) => ({
  todos: [],
  filter: 'all',

  initializeTodos: (todos: Todo[]) => set({ todos }),

  addTodo: (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };

    set((state) => {
      const newTodos = [...state.todos, newTodo];
      saveToLocalStorage(newTodos);
      return { todos: newTodos };
    });
  },

  toggleTodo: (id: string) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveToLocalStorage(newTodos);
      return { todos: newTodos };
    }),

  deleteTodo: (id: string) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      saveToLocalStorage(newTodos);
      return { todos: newTodos };
    }),

  setFilter: (filter) => set({ filter }),
}));
