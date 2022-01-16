<script lang="ts">
import { ref, watch, defineComponent, computed } from 'vue'
import { store } from '@/store'
import { TagNode, TodoItem, TodoItemState } from '@/store/store.types'
import SideButton from '@/components/SideButton.vue'

const emptyTodoItem: TodoItem = {
  id: '',
  name: '',
  state: TodoItemState.WAITING,
  tags: [],
}

export default defineComponent({
    components: { SideButton },
    setup() {
      const waitingTodosCount = ref<number>(store.getters.waitingTodos.length)
      const doneTodosCount = ref<number>(store.getters.doneTodos.length)

      const fillAllowedTags = (searchedTagId: string, include: boolean, tagNode: TagNode, allowedTags: string[]) => {
        tagNode?.tags && tagNode.tags.forEach(node => {
          const keepInclude = include || (node.tagId === searchedTagId)
          if (keepInclude) allowedTags.push(node.tagId)
          fillAllowedTags(searchedTagId, keepInclude, node, allowedTags)
        })
      }

      const getFilteredList = () => {
        const selectedTag = store.state.selectedTag
        const allowedTags: string[] = []

        fillAllowedTags(selectedTag?.id ?? '', false, store.state.tagTree[0], allowedTags)

        const filtered = [
          ...store.state.todos
            .filter(todo => todo.tags?.find(tag => allowedTags.includes(tag)))
        ]

        return [
          ...filtered.filter(todo => todo.state === TodoItemState.WAITING),
          ...filtered.filter(todo => todo.state === TodoItemState.DONE),
        ]
      }

      const list = computed(getFilteredList)

      watch(() => store.state.selectedTag, getFilteredList)

      const toggleItemSelection = (todoItem: TodoItem) => {
        if (store.state.selectedTodoItem?.id === todoItem.id) {
          store.commit('setSelectedTodoItem', emptyTodoItem)
        } else {
          store.commit('setSelectedTodoItem', todoItem)
        }
      }

      const setAsDone = (todoId: string) => {
        store.dispatch("setTodoItemAsDone", todoId)
          .catch((error) => {
            console.log(error)
          })
      }

      const isDone = () => !list.value.find((item: TodoItem) => item.state !== TodoItemState.DONE)

      return {
        list,
        TodoItemState,
        setAsDone,
        isDone,
        waitingTodosCount,
        doneTodosCount,
        toggleItemSelection,
        store,
      }
    },
})
</script>

<template>
  <h2 class="header">
    <div v-if="isDone()">
      <span v-if="list?.length" class="done-count">Well done !</span>
    </div>
    <div v-else>
      to do: <span class="todo-count">{{ waitingTodosCount }}</span> |
      done: <span class="done-count">{{ doneTodosCount }}</span>
    </div>
  </h2>
  <ul class="todo-list">
    <li
      :class="[ todo.state === TodoItemState.DONE && 'done', store.state.selectedTodoItem === todo && 'selected' ]"
      :key="todo.id"
      v-for="todo in list"
      @click="() => toggleItemSelection(todo)"
    >
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
      </div>
      <div v-if="todo.description" class='line-2'>{{ todo.description }}</div>
    </li>
  </ul>
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
    &.selected {
      background-color: $list-item-selected-background;
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
    padding-left: .5rem;
  }
  .done {
    color: $list-item-grayed-color;
    background-color: $list-item-grayed-background;
  }
}
</style>