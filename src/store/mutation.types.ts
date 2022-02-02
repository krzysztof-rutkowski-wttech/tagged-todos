import { State, TodoItem, Tag, TagNode, Overlay } from '@/store/store.types'

export enum MutationTypes {
  setTodoItemAsDone = 'setTodoItemAsDone',
  removeTodoItem = 'removeTodoItem',
  setTodos = 'setTodos',
  addTodoItem = 'addToDoItem',
  updateTodoItem = 'updateTodoItem',
  setTags = 'setTags',
  setTagTree = 'setTagTree',
  addOverlay = 'addOverlay',
  removeOverlay = 'removeOverlay',
  setSelectedTag = 'setSelectedTag',
  setSelectedTodoItem = 'setSelectedTodoItem',
}

export type Mutations = {
  [MutationTypes.setTodoItemAsDone] (state: State, todoId: string): void,
  [MutationTypes.removeTodoItem] (state: State, todoId: string): void,
  [MutationTypes.setTodos] (state: State, todos: TodoItem[]): void,
  [MutationTypes.setTags] (state: State, tags: Tag[]): void,
  [MutationTypes.setTagTree] (state: State, tagTree: TagNode[]): void,
  [MutationTypes.addOverlay] (state: State, overlay: Overlay): void,
  [MutationTypes.addTodoItem] (state: State, todoItem: TodoItem): void,
  [MutationTypes.updateTodoItem] (state: State, todoItem: TodoItem): void,
  [MutationTypes.removeOverlay] (state: State, overlayId: string): void,
  [MutationTypes.setSelectedTag] (state: State, tag: Tag): void,
  [MutationTypes.setSelectedTodoItem] (state: State, todoItem: TodoItem): void,
}
