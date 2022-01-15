
export enum TodoItemState { WAITING, DONE }
export enum TagType { TOP = 'top', 'NORMAL' = 'NORMAL' }

export interface TodoItem {
  id: string,
  name: string,
  description?: string,
  state: TodoItemState,
  tags?: string[],
}

export interface Tag {
  id: string,
  name: string,
  type: TagType,
  description: string,
}

export interface TagNode {
  tagId: string,
  tags?: TagNode[],
}

export interface TagDef {
  tags: Tag[],
  tagTree: TagNode[],
}

export interface Overlay {
  overlayId: string,
  params?: Object;
}
export interface State {
  todos: TodoItem[],
  tags: Tag[],
  tagTree: TagNode[],
  isLoading: boolean,
  overlays: Overlay[],
  selectedTag: Tag | undefined,
  selectedTodoItem: TodoItem | undefined,
}
