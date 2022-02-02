import { ActionContext } from 'vuex'
import { State } from '@/store/store.types'
import { Mutations } from '@/store/mutation.types'
import { TodoItemState } from '@/services/model.types'

export enum ActionTypes {
    setTodoItemAsDone = 'setTodoItemAsDone',
    removeTodoItem = 'removeTodoItem',
    loadTodos = 'loadTodos',
    addTodoItem = 'addTodoItem',
    updateTodoItem = 'updateTodoItem',
    loadTags = 'loadTags',
    addTag = 'addTag',
    updateTag = 'updateTag',
  }

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

interface AddTodoItemPayload { 
  name: string,
  description: string,
  tags: string[],
}

interface UpdateTodoItemPayload extends AddTodoItemPayload {
  id: string,
  state: TodoItemState,
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

  [ActionTypes.updateTodoItem] (
    { commit }: AugmentedActionContext,
    payload: UpdateTodoItemPayload,
  ): Promise<void>,

  [ActionTypes.loadTags] (
    { commit }: AugmentedActionContext
  ): Promise<void>,
}
