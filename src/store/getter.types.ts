import { State, TodoItem, Tag } from '@/store/store.types'


export enum GetterTypes {
  waitingTodos = 'waitingTodos',
  doneTodos = 'doneTodos',
  getTagById = 'getTagById',
  getTodoItemById = 'getTodoItemById',
}

export type Getters = {
  [GetterTypes.waitingTodos] (state: State): TodoItem[],
  [GetterTypes.doneTodos] (state: State): TodoItem[],
  [GetterTypes.getTagById] (state: State): (id: string) => Tag | undefined ,
  [GetterTypes.getTodoItemById] (state: State): (id: string) => TodoItem | undefined,
}
