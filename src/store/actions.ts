import { ActionTree } from 'vuex'
import { ActionTypes, Actions } from './action.types'
import { loadTodos, loadTags, deleteTodoItem, updateTodoItemStatus } from '../services/todosApi'
import { TodoItemState, State } from './store.types'
import { MutationTypes } from './mutation.types'

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
        .then( ({ data }) => { 
          console.log(data)
          commit(MutationTypes.setTodos, data.todos) 
        })

        .catch( ({ errorDescr }) => console.log(errorDescr) )
    },

    async [ActionTypes.loadTags] ({ commit }) {
      loadTags()
        .then( ({ data }) => commit(MutationTypes.setTags, data.tags) )
        .catch( ({ errorDescr }) => console.log(errorDescr) )
    }
}
