'use client';

import { TodoList } from '@/components/TodoList';
import { useTodoStore } from '@/store/useTodoStore';
import { Todo } from '@/types/todo';
import { useEffect, useState } from 'react';

interface SavedTodo extends Omit<Todo, 'createdAt'> {
  createdAt: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { initializeTodos, filter, setFilter, todos } = useTodoStore();

  useEffect(() => {
    const loadTodos = () => {
      try {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
          const todos = JSON.parse(savedTodos) as SavedTodo[];
          const parsedTodos = todos.map((todo) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
          }));
          initializeTodos(parsedTodos);
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, [initializeTodos]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500" />
      </div>
    );
  }

  const activeTodos = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-6">待辦事項</h1>

          <div className="flex justify-center gap-2">
            {[
              { id: 'all', label: '全部', count: todos.length },
              { id: 'active', label: '進行中', count: activeTodos },
              { id: 'completed', label: '已完成', count: completedTodos },
            ].map(({ id, label, count }) => (
              <button
                key={id}
                onClick={() => setFilter(id as 'all' | 'active' | 'completed')}
                className={`
                  min-w-[100px] px-4 py-2
                  rounded-full text-sm font-medium
                  ${
                    filter === id
                      ? 'bg-orange-400 text-white'
                      : 'bg-white text-orange-600 border border-orange-200'
                  }
                `}
              >
                {label}
                <span className={`ml-1 ${filter === id ? 'text-white/80' : 'text-orange-400'}`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem('todo') as HTMLInputElement;
            if (input.value.trim()) {
              useTodoStore.getState().addTodo(input.value.trim());
              input.value = '';
            }
          }}
          className="relative mb-8"
        >
          <input
            type="text"
            name="todo"
            placeholder="新增待辦事項..."
            className="
              w-full px-6 py-4 pr-16 
              bg-white rounded-full
              border border-orange-200
              placeholder-orange-300 text-orange-700
              focus:outline-none focus:ring-2 
              focus:ring-orange-300
            "
          />

          <button
            type="submit"
            className="
              absolute right-3 top-1/2 -translate-y-1/2 
              p-2.5 rounded-full
              bg-orange-400 text-white
              focus:outline-none focus:ring-2 
              focus:ring-orange-300
            "
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </form>

        <div className="space-y-3">
          <TodoList />
        </div>
      </div>
    </main>
  );
}
