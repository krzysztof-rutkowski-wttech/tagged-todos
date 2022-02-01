import { TagModel, TodoItemModel } from "@/services/model.types";

export enum TodoItemState { WAITING = 'WAITING', DONE = 'DONE' }
export enum TagType { FIXED = 'FIXED', NORMAL = 'NORMAL', EMPTY = 'EMPTY' }
export type TodoItem = TodoItemModel
export type Tag = TagModel

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
