import { Status, ReturnStatus, LoadTodoList, LoadTagist } from './todosApi.types'
import { TodoItemState, TodoItem } from '../store/store.types'
import { store } from '../store'

const todos: TodoItem[] = [
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

const apiCallMock = async <T>(mockResult: T) => new Promise<any>((resolve => {
    store.state.isLoading = true;
    setTimeout(() => {
        store.state.isLoading = false;
        resolve({
            status: Status.OK,
            data:  mockResult
        })
    }, 2000)
}))

export const loadTodos = async (): Promise<LoadTodoList> => {
    const result = await apiCallMock<any>({ todos })
    return result as LoadTodoList
//    return Promise.reject({ status: Status.ERROR, errorDescr: 'error loading todo items' })
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
