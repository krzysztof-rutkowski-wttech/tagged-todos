import { GetterTree } from 'vuex'
import { TodoItemState, TodoItem, Tag, State } from '@/store/store.types'
import { GetterTypes, Getters } from '@/store/getter.types'

export const getters: GetterTree<State, State> & Getters = {
    [GetterTypes.waitingTodos] (state: State): TodoItem[] {
      return state.todos.filter(todo => todo.state === TodoItemState.WAITING)
    },
    [GetterTypes.doneTodos] (state: State): TodoItem[] {
      return state.todos.filter(todo => todo.state === TodoItemState.DONE)
    },
    [GetterTypes.getTagById]: (state: State) => (id: string): Tag | undefined => {
      return state.tags.find(tag => tag.id === id)
    },
    [GetterTypes.getTodoItemById]: (state: State) => (id: string): TodoItem | undefined => {
      return state.todos.find(todoItem => todoItem.id === id)
    }
}
