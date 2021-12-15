import { ActionTree } from 'vuex'
import { ActionTypes, Actions } from '@/store/action.types'
import { loadTodos, loadTags, deleteTodoItem, updateTodoItemStatus, addTodoItem } from '@/services/todosApi'
import { TodoItemState, State } from '@/store/store.types'
import { MutationTypes } from '@/store/mutation.types'

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.setTodoItemAsDone] ({ commit }, todoId) {
      try {
        await updateTodoItemStatus(todoId, TodoItemState.DONE)
        commit(MutationTypes.setTodoItemAsDone, todoId)
      } catch ({ errorDescr }) {
        console.log(errorDescr)
      }
    },

    async [ActionTypes.removeTodoItem] ({ commit }, todoId) {
      try {
        await deleteTodoItem(todoId)
        commit(MutationTypes.removeTodoItem, todoId)
      } catch ({ errorDescr }) {
        console.log(errorDescr)
      }
    },

    async [ActionTypes.loadTodos] ({ commit }) {
      try {
        const { data } = await loadTodos()
        commit(MutationTypes.setTodos, data?.todos ?? []) 
      } catch ({ errorDescr }) {
        console.log(errorDescr)
      }
    },

    async [ActionTypes.addTodoItem] ({ commit }, { name, description }) {
      try {
        const { data } = await addTodoItem({ name, description })       
        if (data) commit(MutationTypes.addTodoItem, data)
      } catch ({ errorDescr }) {
        console.log(errorDescr)
      }
    },

    async [ActionTypes.loadTags] ({ commit }) {
      try {
        const { data } = await loadTags()
        commit(MutationTypes.setTags, data?.tags ?? [])
      } catch ({ errorDescr }) {
        console.log(errorDescr)
      }
    }
}
