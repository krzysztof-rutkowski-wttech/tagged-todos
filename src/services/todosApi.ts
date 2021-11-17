import { TodoItemState, TodoItem, Tag } from '../store/store.types'

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

const todos = [
    { id: 'todo-1', name: 'tomatoe', description: 'buy yellow tomatoe', state: TodoItemState.WAITING },
    { id: 'todo-2', name: 'chocolate', description: '80% chocolate', state: TodoItemState.WAITING },
    { id: 'todo-3', name: 'hammer', description: '', state: TodoItemState.WAITING },
    { id: 'todo-4', name: 'soil flower', description: '', state: TodoItemState.DONE },
]

const tags = [
    { id: 'tag-1', name: 'gardening' },
    { id: 'tag-2', name: 'tools' },
    { id: 'tag-3', name: 'food' },
]

export const loadTodos = async (): Promise<LoadTodoList> => {
    return Promise.resolve({ status: Status.OK, data: { todos } })
    // return Promise.reject({ status: Status.ERROR, errorDescr: 'error loading todo items' })
}

export const loadTags = async (): Promise<LoadTagist> => {
    return Promise.resolve({ status: Status.OK, data: { tags } })
    // return Promise.reject({ status: Status.ERROR, errorDescr: 'error loading todo items' })
}

export const deleteTodoItem = async (id: string): Promise<ReturnStatus> => {
    return Promise.resolve({ status: Status.OK })
    // return Promise.reject({ status: Status.ERROR, errorDescr: 'error deleting item' })
}


export const updateTodoItemStatus = async (id: string, state: TodoItemState): Promise<ReturnStatus> => {
    return Promise.resolve({ status: Status.OK })
    // return Promise.reject({ status: Status.ERROR, errorDescr: 'error updating item' })
}