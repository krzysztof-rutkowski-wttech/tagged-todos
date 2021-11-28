
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

export interface Overlay {
  overlayId: string,
  params?: Object;
}
export interface State {
  todos: TodoItem[],
  tags: Tag[],
  isLoading: boolean,
  overlays: Overlay[],
}
