import { GetterTree } from 'vuex'
import { TodoItemState, TodoItem, Tag, State } from './store.types'


export const getters: GetterTree<State, State> = {
    waitingTodos (state: State): TodoItem[] {
      return state.todos.filter(todo => todo.state === TodoItemState.WAITING)
    },
    doneTodos (state: State): TodoItem[] {
      return state.todos.filter(todo => todo.state === TodoItemState.DONE)
    },
    getTagById: (state: State) => (id: string): Tag | undefined => {
      return state.tags.find(tag => tag.id === id)
    },
    getTodoItemById: (state: State) => (id: string): TodoItem | undefined => {
      return state.todos.find(todoItem => todoItem.id === id)
    }
}