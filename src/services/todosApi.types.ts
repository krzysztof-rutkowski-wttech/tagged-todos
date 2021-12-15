import { TodoItem, Tag } from '@/store/store.types'

export enum Status {
    ERROR,
    OK
}
export interface TodoListData {
    todos: TodoItem[]
}

export interface TagsData {
    tags: Tag[]
}

export interface ReturnStatus<DataType> {
    status: Status;
    errorDescr?: string;
    data?: DataType;
}

export type LoadTodoList = ReturnStatus<TodoListData>

export type LoadTagist = ReturnStatus<TagsData>

export type addTodoItemFun = (props: {
    name: string;
    description?: string;
}) => Promise<ReturnStatus<TodoItem>>
