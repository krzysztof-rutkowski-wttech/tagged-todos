import { ActionTree, ActionContext } from 'vuex'
import { ActionTypes } from './action.types'
import { loadTodos, loadTags, deleteTodoItem, updateTodoItemStatus } from '../services/todosApi'
import { TodoItemState, State } from './store.types'
import { Mutations, MutationTypes } from './mutation.types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    todoId: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.setTodoItemAsDone] (
    { commit }: AugmentedActionContext,
    todoId: string
  ): Promise<void>,

  [ActionTypes.removeTodoItem] (
    { commit }: AugmentedActionContext,
    todoId: string
  ): Promise<void>,

  [ActionTypes.loadTodos] (
    { commit }: AugmentedActionContext
  ): Promise<void>,

  [ActionTypes.loadTags] (
    { commit }: AugmentedActionContext
  ): Promise<void>,
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.setTodoItemAsDone] ({ commit }, todoId) {
      updateTodoItemStatus(todoId, TodoItemState.DONE)
        .then( () => commit(MutationTypes.setTodoItemAsDone, todoId) )
        .catch( ({ errorDescr }) => console.log(errorDescr) )
    },

    async [ActionTypes.removeTodoItem] ({ commit }, todoId) {
      deleteTodoItem(todoId)
        .then( () => commit(MutationTypes.removeTodoItem, todoId) )
        .catch( ({ errorDescr }) => console.log(errorDescr) )
    },

    async [ActionTypes.loadTodos] ({ commit }) {
      loadTodos()
        .then( ({ data }) => commit(MutationTypes.setTodos, data.todos) )
        .catch( ({ errorDescr }) => console.log(errorDescr) )
    },

    async [ActionTypes.loadTags] ({ commit }) {
      loadTags()
        .then( ({ data }) => commit(MutationTypes.setTags, data.tags) )
        .catch( ({ errorDescr }) => console.log(errorDescr) )
    }
}
