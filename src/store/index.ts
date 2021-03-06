import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { State } from './store.types'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

export const key: InjectionKey<Store<State>> = Symbol()

const state: State = {
  todos: [],
  tags: [],
  tagTree: [],
  isLoading: false,
  overlays: [],
  selectedTag: undefined,
  selectedTodoItem: undefined,
}

export const store = createStore<State>({
  state,
  getters,
  mutations,
  actions,
})
