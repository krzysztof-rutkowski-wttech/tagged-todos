import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation.types'
import { State, TodoItemState, TodoItem, Tag, Overlay } from './store.types'
import { Mutations } from './mutation.types'

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.setTodoItemAsDone] (state: State, todoId: string): void {
    const newTodos = [ ...state.todos ]
    const todoItem = newTodos.find(todoItem => todoItem.id === todoId)
    if (todoItem) {
      todoItem.state = TodoItemState.DONE
    }
    state.todos = newTodos
  },

  [MutationTypes.removeTodoItem] (state: State, todoId: string): void {
    const newTodos = [ ...state.todos ]
    const index = newTodos.findIndex(todoItem => todoItem.id === todoId)
    if (index >= 0) {
      newTodos.splice(index, 1)
    }
    state.todos = newTodos
  },

  [MutationTypes.setTodos] (state: State, data: TodoItem[]): void {
    state.todos = data;
  },

  [MutationTypes.addTodoItem] (state: State, todoItem: TodoItem): void {
    state.todos = [ ...state.todos, todoItem ]
  },

  [MutationTypes.setTags] (state: State, data: Tag[]): void {
    state.tags = data;
  },

  [MutationTypes.addOverlay] (state: State, overlay: Overlay): void {
    const overlays = [ ...state.overlays ]
    if (!overlays.find(o => o.overlayId === overlay.overlayId)) {
      overlays.push(overlay)
      state.overlays = overlays
    }
  },
  
  [MutationTypes.removeOverlay] (state: State, overlayId: string): void {
    const overlays = [ ...state.overlays ]
    const index = overlays.findIndex(o => o.overlayId === overlayId)
    if (index >= 0) {
      overlays.splice(index, 1)
      state.overlays = overlays
    }
  },
}
