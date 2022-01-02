import { TodoItem, Tag, TagNode } from '@/store/store.types'

export enum Status {
    ERROR,
    OK
}
export interface TodoListData {
    todos: TodoItem[]
}

export interface TagsData {
    tags: Tag[],
    tagTree: TagNode[],
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
