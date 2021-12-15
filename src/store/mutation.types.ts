import { State, TodoItem, Tag, Overlay } from '@/store/store.types'

export enum MutationTypes {
    setTodoItemAsDone = 'setTodoItemAsDone',
    removeTodoItem = 'removeTodoItem',
    setTodos = 'setTodos',
    addTodoItem = 'addToDoItem',
    setTags = 'setTags',
    addOverlay = 'addOverlay',
    removeOverlay = 'removeOverlay',
  }

export type Mutations = {
  [MutationTypes.setTodoItemAsDone] (state: State, todoId: string): void,
  [MutationTypes.removeTodoItem] (state: State, todoId: string): void,
  [MutationTypes.setTodos] (state: State, todos: TodoItem[]): void,
  [MutationTypes.setTags] (state: State, tags: Tag[]): void,
  [MutationTypes.addOverlay] (state: State, overlay: Overlay): void,
  [MutationTypes.addTodoItem] (state: State, todoItem: TodoItem): void,
  [MutationTypes.removeOverlay] (state: State, overlayId: string): void,
}
