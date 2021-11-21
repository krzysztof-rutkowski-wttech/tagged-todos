import { TodoItem, Tag } from '../store/store.types'

export interface TodoListData {
    todos: TodoItem[]
}

export interface TagsData {
    tags: Tag[]
}

export enum Status {
    ERROR,
    OK
}

export interface ReturnStatus {
    status: Status;
    errorDescr?: string;
}

export interface LoadTodoList extends ReturnStatus {
    data: TodoListData
}

export interface LoadTagist extends ReturnStatus {
    data: TagsData
}
