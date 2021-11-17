import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation.types'
import { State, TodoItemState, TodoItem, Tag } from './store.types'
import { Mutations } from './mutation.types'

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.setTodoItemAsDone] (state: State, todoId: string): void {
    const todoItem = state.todos.find(todoItem => todoItem.id === todoId)
    if (todoItem) {
      todoItem.state = TodoItemState.DONE
    }
  },
  [MutationTypes.removeTodoItem] (state: State, todoId: string): void {
    const index = state.todos.findIndex(todoItem => todoItem.id === todoId)
    if (index >= 0) {
      state.todos.splice(index, 1);
    }
  },
  [MutationTypes.setTodos] (state: State, data: TodoItem[]): void {
    state.todos = data;
  },
  [MutationTypes.setTags] (state: State, data: Tag[]): void {
    state.tags = data;
  },
}
