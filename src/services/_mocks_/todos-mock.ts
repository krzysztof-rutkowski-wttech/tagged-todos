import { TodoItemState, TodoItem } from '@/store/store.types'

export const todos: TodoItem[] = [
    { id: 'todo-1', name: 'tomatoe', description: 'buy yellow tomatoe', state: TodoItemState.WAITING },
    { id: 'todo-2', name: 'chocolate', description: '80% chocolate', state: TodoItemState.WAITING },
    { id: 'todo-3', name: 'hammer', description: '', state: TodoItemState.WAITING },
    { id: 'todo-4', name: 'soil flower', description: '', state: TodoItemState.DONE },
]
