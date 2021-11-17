import { State, TodoItem, Tag } from './store.types'

export enum MutationTypes {
    setTodoItemAsDone = 'setTodoItemAsDone',
    removeTodoItem = 'removeTodoItem',
    setTodos = 'setTodos',
    setTags = 'setTags',
  }

export type Mutations = {
  [MutationTypes.setTodoItemAsDone] (state: State, todoId: string): void,
  [MutationTypes.removeTodoItem] (state: State, todoId: string): void,
  [MutationTypes.setTodos] (state: State, todos: TodoItem[]): void,
  [MutationTypes.setTags] (state: State, tags: Tag[]): void,
}
