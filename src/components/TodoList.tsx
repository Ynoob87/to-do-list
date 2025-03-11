import { useTodoStore } from '@/store/useTodoStore';
import { useMemo } from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, filter } = useTodoStore();

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        目前沒有{filter === 'active' ? '進行中的' : filter === 'completed' ? '已完成的' : ''}
        待辦事項
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
