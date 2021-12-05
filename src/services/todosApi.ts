import { Status, ReturnStatus, TagsData, TodoListData, addTodoItemFun } from './todosApi.types'
import { TodoItemState, TodoItem, Tag } from '../store/store.types'
import { store } from '../store'

const todos: TodoItem[] = [
    { id: 'todo-1', name: 'tomatoe', description: 'buy yellow tomatoe', state: TodoItemState.WAITING },
    { id: 'todo-2', name: 'chocolate', description: '80% chocolate', state: TodoItemState.WAITING },
    { id: 'todo-3', name: 'hammer', description: '', state: TodoItemState.WAITING },
    { id: 'todo-4', name: 'soil flower', description: '', state: TodoItemState.DONE },
]

const tags: Tag[] = [
    { id: 'tag-1', name: 'gardening' },
    { id: 'tag-2', name: 'tools' },
    { id: 'tag-3', name: 'food' },
]

const apiCallMock = async <P>(mockResult?: P) => new Promise<ReturnStatus<P>>(resolve => {
    store.state.isLoading = true;
    setTimeout(() => {
        store.state.isLoading = false;
        resolve({
            status: Status.OK,
            data:  mockResult
        })
    }, 500)
})

export const loadTodos = async (): Promise<ReturnStatus<TodoListData>> => {
    return await apiCallMock<TodoListData>({ todos })
//    return Promise.reject({ status: Status.ERROR, errorDescr: 'error loading todo items' })
}

export const addTodoItem: addTodoItemFun = async ({ name, description }): Promise<ReturnStatus<TodoItem>> => {
    return await apiCallMock<TodoItem>({
        id: Math.ceil(Math.random()*1000000).toString(),
        name,
        description,
        state: TodoItemState.WAITING
    })
//    return Promise.reject({ status: Status.ERROR, errorDescr: 'error loading todo items' })
}

export const loadTags = async (): Promise<ReturnStatus<TagsData>> => {
    //return Promise.resolve({ status: Status.OK, data: { tags } })
    return await apiCallMock<TagsData>({ tags })
    // return Promise.reject({ status: Status.ERROR, errorDescr: 'error loading todo items' })
}

export const deleteTodoItem = async (id: string): Promise<ReturnStatus<void>> => {
    return await apiCallMock()
    // return Promise.reject({ status: Status.ERROR, errorDescr: 'error deleting item' })
}


export const updateTodoItemStatus = async (id: string, state: TodoItemState): Promise<ReturnStatus<void>> => {
    return await apiCallMock()
    // return Promise.reject({ status: Status.ERROR, errorDescr: 'error updating item' })
}
