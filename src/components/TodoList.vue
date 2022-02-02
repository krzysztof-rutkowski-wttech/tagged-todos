<script lang="ts">
import { watch, defineComponent, ref } from 'vue'
import { store } from '@/store'
import { Tag, TagNode, TodoItem, TodoItemState } from '@/store/store.types'
import SideButton from '@/components/SideButton.vue'
import { MutationTypes } from '@/store/mutation.types'
import { ActionTypes } from '@/store/action.types'

const emptyTodoItem: TodoItem = {
  id: '',
  name: '',
  state: TodoItemState.WAITING,
  tags: [],
}

export default defineComponent({
    components: { SideButton },
    expose: [ 'list' ],
    setup(_, { expose }) {
      const filteredList = ref<TodoItem[]>([])
      const list = ref<TodoItem[]>([])
      const fillAllowedTags = (searchedTagId: string, include: boolean, tagNode: TagNode, allowedTags: string[]) => {
        tagNode?.tags && tagNode.tags.forEach(node => {
          const keepInclude = include || (node.tagId === searchedTagId)
          if (keepInclude) allowedTags.push(node.tagId)
          fillAllowedTags(searchedTagId, keepInclude, node, allowedTags)
        })
      }
      const getOrderedList = () => (
        [
          ...filteredList.value.filter(todo => todo.state === TodoItemState.WAITING),
          ...filteredList.value.filter(todo => todo.state === TodoItemState.DONE),
        ]
      )

      expose({ list })

      const filterTodoListByTag = (tag: Tag) => {
        const allowedTags: string[] = []

        fillAllowedTags(tag.id ?? '', false, store.state.tagTree[0], allowedTags)

        filteredList.value = [
          ...store.state.todos
            .filter(todo => todo.tags?.find(tag => allowedTags.includes(tag)))
        ]
        list.value = getOrderedList()
      }

      watch(() => store.state.selectedTag, () => filterTodoListByTag(store.state.selectedTag!))

      const toggleItemSelection = (todoItem: TodoItem) => {
        store.commit(MutationTypes.setSelectedTodoItem, 
          store.state.selectedTodoItem?.id === todoItem.id
          ? emptyTodoItem
          : todoItem
        )
      }

      const setAsDone = (todoId: string) => {
        store.dispatch(ActionTypes.setTodoItemAsDone, todoId)
          .then(() => list.value = getOrderedList())
          .catch((error) => {
            console.log(error)
          })
      }

      return {
        list,
        TodoItemState,
        setAsDone,
        toggleItemSelection,
        store,
      }
    },
})
</script>

<template>
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