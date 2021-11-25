
export enum TodoItemState { WAITING, DONE }

export interface TodoItem {
  id: string,
  name: string,
  description?: string,
  state: TodoItemState,
}

export interface Tag {
  id: string,
  name: string,
}

export interface State {
  todos: TodoItem[],
  tags: Tag[],
  isLoading: boolean,
  overlayOpened: boolean,
}
