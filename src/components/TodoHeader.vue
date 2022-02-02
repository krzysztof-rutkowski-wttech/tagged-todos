<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
import { store } from '@/store'
import { TodoItem, TodoItemState } from '@/store/store.types'

export default defineComponent({
    props: {
      list: {
        type: Object as PropType<TodoItem[]>,
        required: true,
      }
    },
    setup(props) {
      const doneTodosCount = ref<number>(0)
      const waitingTodosCount = ref<number>(0)
      const isDone = false

      watch(() => props.list, () => {
        doneTodosCount.value = props.list.filter(todo => todo.state === TodoItemState.DONE).length
        waitingTodosCount.value = props.list.filter(todo => todo.state === TodoItemState.WAITING).length
      })

      return {
        isDone,
        waitingTodosCount,
        doneTodosCount,
        store,
      }
    },
})
</script>

<template>
  <h2 class="header">
    <div v-if="waitingTodosCount === 0">
      <span class="done-count">Well done !</span>
    </div>
    <div v-else>
      to do: <span class="todo-count">{{ waitingTodosCount }}</span> |
      done: <span class="done-count">{{ doneTodosCount }}</span>
    </div>
  </h2>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

h2.header {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 400;
}

.todo-count {
  color: $no-color;
  font-weight: 600;
}

.done-count {
  color: $yes-color;
  font-weight: 600;
}
</style>