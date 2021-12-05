import { ActionContext } from 'vuex'
import { State } from './store.types'
import { Mutations } from './mutation.types'

export enum ActionTypes {
    setTodoItemAsDone = 'setTodoItemAsDone',
    removeTodoItem = 'removeTodoItem',
    loadTodos = 'loadTodos',
    addTodoItem = 'addTodoItem',
    loadTags = 'loadTags',
  }

// type AugmentedActionContext = {
//   commit<K extends keyof Mutations>(
//     key: K,
//     todoId: Parameters<Mutations[K]>[1]
//   ): ReturnType<Mutations[K]>
// } & Omit<ActionContext<State, State>, 'commit'>


type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

interface AddTodoItemPayload { 
  name: string,
  description: string,
}

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
    { commit }: AugmentedActionContext,
  ): Promise<void>,

  [ActionTypes.addTodoItem] (
    { commit }: AugmentedActionContext,
    payload: AddTodoItemPayload,
  ): Promise<void>,

  [ActionTypes.loadTags] (
    { commit }: AugmentedActionContext
  ): Promise<void>,
}
