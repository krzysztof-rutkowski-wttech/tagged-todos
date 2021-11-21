<template>
    <h2 class="header">
        <div v-if="isDone()">
        <span class="done-count">Well done !</span>
        </div>
        <div v-else>
        to do: <span class="todo-count">{{ waitingTodosCount }}</span> |
        done: <span class="done-count">{{ doneTodosCount }}</span>
        </div>
    </h2>
    <ul class="todo-list">
        <li :class="[ todo.state === TodoItemState.DONE && 'done' ]" v-for="todo in list" :key="todo.id">
        <div class='line-1'>
            <button class="do-btn" @click="setAsDone(todo.id)">
            {{ todo.state === TodoItemState.WAITING ? 'do' : 'done'}}
            </button>
            <div class="name">{{ todo.name }}</div>
            <button class="remove-btn" @click="remove(todo.id)">remove</button>
        </div>
        <div v-if="todo.description" class='line-2'>{{ todo.description }}</div>
        </li>
    </ul>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import { store } from '../store'
import { TodoItem, TodoItemState } from '../store/store.types'
import useIsLoading from '../utils/useIsLoading'

export default {
  setup() {
    const list = ref<TodoItem[]>([
      ...store.getters.waitingTodos,
      ...store.getters.doneTodos,
    ]);

    const waitingTodosCount = ref<number>(store.getters.waitingTodos.length)
    const doneTodosCount = ref<number>(store.getters.doneTodos.length)

    watch(() => store.state.todos, () => {
        waitingTodosCount.value = store.getters.waitingTodos.length
        doneTodosCount.value = store.getters.doneTodos.length
        if (list.value.length > 0) return
        list.value = [
            ...store.getters.waitingTodos,
            ...store.getters.doneTodos,
        ]
    });

    const { isLoading } = useIsLoading();

    const remove = (todoId: string) => {
      store.dispatch('removeTodoItem', todoId)
        .then(() => {
          const index = list.value.findIndex( (item: TodoItem) => item.id === todoId)
          if (index >= 0) list.value.splice(index, 1)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const setAsDone = (todoId: string) => {
      store.dispatch('setTodoItemAsDone', todoId)
        .catch((error) => {
          console.log(error)
        })
    }

    const isDone = () => !list.value.find( (item: TodoItem) => item.state !== TodoItemState.DONE)
  
    return {
      list,
      TodoItemState,
      remove,
      setAsDone,
      isDone,
      waitingTodosCount,
      doneTodosCount,
      isLoading,
    }
  },
};
</script>

<style scoped>
  h2.header {
    text-align: center;
    font-size: 1.25rem;
  }

  .todo-count {
    color: #c76d7e;
  }

  .done-count {
    color: #4C8577;
  }
  ul.todo-list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
  }

  .todo-list li {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #bbb;
  }

  .todo-list li:first-child {
    border-top: 1px solid #bbb;
  }

  .todo-list .line-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .todo-list .line-2 {
    margin-top: 1rem;
  }

  .todo-list .name {
    flex-grow: 1;
    margin: 0 1rem;
    font-size: 1.75rem;
  }

  .todo-list button {
    width: 5rem;
    padding: 0.75rem;
    border: 1px solid #fff;
    cursor: pointer;
    border-radius: 12px;
    background-color: #e5e8e9;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .todo-list .do-btn {
    background-color: #e5e8e9;
    color: #4C8577;
  }

  .todo-list .remove-btn {
    background-color: #e5e8e9;
    color: #c76d7e;
  }

  .todo-list .done .do-btn {
    border: 1px solid #aaa;
    cursor: unset;
    background-color: #e5e8e9;
    color: #aaa;
  }

  .todo-list .done {
    color: #aaa;
    background-color: #e5e8e9;
  }
</style>