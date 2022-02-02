import { Status, TodoItemModel, TodoListModel, TagsModel, TodoItemState } from '@/services/model.types'

export interface ReturnStatus<DataType> {
    status: Status;
    errorDescr?: string;
    data?: DataType;
}

export type LoadTodoList = ReturnStatus<TodoListModel>

export type LoadTagist = ReturnStatus<TagsModel>

export type addTodoItemFun = (props: {
    name: string;
    description?: string;
    tags: string[];
}) => Promise<ReturnStatus<TodoItemModel>>

export type updateTodoItemFun = (props: {
    id: string;
    name: string;
    description?: string;
    state: TodoItemState;
    tags: string[];
}) => Promise<ReturnStatus<TodoItemModel>>
