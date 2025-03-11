import { useTodoStore } from '@/store/useTodoStore';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <div
      className={`group flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-full 
        border border-orange-100 shadow-sm transition-all
        ${todo.completed ? 'opacity-60' : 'hover:bg-white/70'}`}
    >
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`flex-none w-6 h-6 rounded-full border-2 transition-colors
          ${
            todo.completed
              ? 'bg-orange-500 border-orange-500'
              : 'border-orange-300 hover:border-orange-500'
          }`}
      >
        {todo.completed && (
          <svg
            className="w-full h-full text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-orange-950 transition-all ${todo.completed ? 'line-through text-orange-400' : ''}`}
        >
          {todo.text}
        </p>
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="flex-none p-2 text-orange-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};
