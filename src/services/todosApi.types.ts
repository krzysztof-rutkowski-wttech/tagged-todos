import { Status, TodoItemModel, TodoListModel, TagsModel } from '@/services/model.types'

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
