import { Status, ReturnStatus, TagsData, TodoListData, addTodoItemFun } from '@/services/todosApi.types'
import { TodoItemState, TodoItem, Tag } from '@/store/store.types'
import { store } from '@/store'
import { todos} from './_mocks_/todos-mock'
import { tags, tagTree } from './_mocks_/tags-mock'


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
    return await apiCallMock<TagsData>({ tags, tagTree })
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
