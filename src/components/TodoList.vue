<script lang="ts">
import { ref, watch, defineComponent } from 'vue'
import { store } from '@/store'
import { TodoItem, TodoItemState } from '@/store/store.types'
import RemoveTodoItemOverlay, { useRemoveTodoItemOverlay } from '@/components/overlays/RemoveTodoItemOverlay.vue'
import SideButton from '@/components/SideButton.vue'

export default defineComponent({
    components: { RemoveTodoItemOverlay, SideButton },
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
        list.value = [
          ...store.getters.waitingTodos,
          ...store.getters.doneTodos,
        ]
      })

      const selectedTodoItem = ref<TodoItem>({
        id: '',
        name: '',
        state: TodoItemState.WAITING,
      })

      const [ openRemoveConfirmOverlay, closeRemoveConfirmaOverlay ] = useRemoveTodoItemOverlay()

      const remove = (todoItem: TodoItem) => {
        selectedTodoItem.value = todoItem
        openRemoveConfirmOverlay()
      };

      const handleTodoItemRemove = (todoItemId: string) => {
        const index = list.value.findIndex( (item: TodoItem) => item.id === todoItemId )
        if (index >= 0) list.value.splice(index, 1)
        closeRemoveConfirmaOverlay()
      }

      const setAsDone = (todoId: string) => {
        store.dispatch("setTodoItemAsDone", todoId)
          .catch((error) => {
            console.log(error)
          });
      };

      const isDone = () => !list.value.find((item: TodoItem) => item.state !== TodoItemState.DONE)

      return {
        list,
        TodoItemState,
        remove,
        setAsDone,
        isDone,
        waitingTodosCount,
        doneTodosCount,
        closeRemoveConfirmaOverlay,
        handleTodoItemRemove,
        selectedTodoItem,
      };
    },
})
</script>

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
                <side-button 
                    left
                    :color-primary="todo.state === TodoItemState.WAITING"
                    :color-grayed="todo.state === TodoItemState.DONE"
                    :onClick="() => todo.state === TodoItemState.WAITING && setAsDone(todo.id)"
                >
                    <icon v-if="todo.state === TodoItemState.DONE" icon="check-circle" size="2x" />
                    <icon v-if="todo.state === TodoItemState.WAITING" icon="play-circle" size="2x" />
                </side-button>
                <div class="name">{{ todo.name }}</div>
                <side-button right color-secondary :onClick="() => remove(todo)">
                    <icon icon="trash-alt" size="2x" />
                </side-button>
            </div>
            <div v-if="todo.description" class='line-2'>{{ todo.description }}</div>
        </li>
    </ul>

    <remove-todo-item-overlay 
      :title="selectedTodoItem?.name"
      :todoItem="selectedTodoItem"
      @onCancel="closeRemoveConfirmaOverlay"
      @onRemove="handleTodoItemRemove"
    />
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

h2.header {
  text-align: center;
  font-size: 1.25rem;
}

.todo-count {
  color: $no-color;
}

.done-count {
  color: $yes-color
}
ul.todo-list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  font-size: 1.25rem;
}

.todo-list {
  li {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid $list-item-divider;
    &:first-child {
      border-top: 1px solid $list-item-divider;
    }
  }
  .line-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .line-2 {
    margin-top: 1rem;
  }
  .name {
    flex-grow: 1;
    margin: 0 1rem;
    font-size: 1.75rem;
    align-self: center;
    padding-left: .75rem;
  }
  .done {
    color: $list-item-grayed-color;
    background-color: $list-item-grayed-background;
  }
}
</style>