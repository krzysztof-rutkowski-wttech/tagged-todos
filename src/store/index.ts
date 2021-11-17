import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { State } from './store.types'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

export const key: InjectionKey<Store<State>> = Symbol()

const state = {
  todos: [],
  tags: [],
}

export const store = createStore<State>({
  state,
  getters,
  mutations,
  actions,
})
