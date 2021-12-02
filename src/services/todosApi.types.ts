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

export interface ReturnStatus<DataType> {
    status: Status;
    errorDescr?: string;
    data?: DataType;
}

export type LoadTodoList = ReturnStatus<TodoListData>

export type LoadTagist = ReturnStatus<TagsData>
