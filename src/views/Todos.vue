<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { store } from '@/store'
import TodoList from '@/components/TodoList.vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TagSelector from '@/components/TagSelector.vue'
import NavBar from '@/components/NavBar.vue'
import AddTodoItemOverlay, { useAddTodoItemOverlay } from '@/components/overlays/AddTodoItemOverlay.vue'
import EditTodoItemOverlay, { useEditTodoItemOverlay } from '@/components/overlays/EditTodoItemOverlay.vue'
import RemoveTodoItemOverlay, { useRemoveTodoItemOverlay } from '@/components/overlays/RemoveTodoItemOverlay.vue'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'
import ActionButtonItem from '@/components/ActionButtonItem.vue'
import { computed } from '@vue/reactivity'
import { MutationTypes } from '@/store/mutation.types'
import { TodoItem } from '@/store/store.types'

export default defineComponent({
  components: {
    TodoList,
    TodoHeader,
    TagSelector,
    NavBar,
    ActionButton,
    ActionButtonItem,
    AddTodoItemOverlay,
    EditTodoItemOverlay,
    RemoveTodoItemOverlay
  },
  setup() {
    const [ openAddTodoOverlay, closeAddTodoOverlay ] = useAddTodoItemOverlay()
    const [ openEditTodoOverlay, closeEditTodoOverlay ] = useEditTodoItemOverlay()
    const isSelected = computed<boolean>(() => !!store.state.selectedTodoItem?.id)
    const [ openRemoveConfirmOverlay, closeRemoveConfirmaOverlay ] = useRemoveTodoItemOverlay()
    const listComponent = ref()

    const editTodo = () => {
      console.log('edit todo')
    }

    const removeTodo = () => {
      if (isSelected.value) {
        store.commit(MutationTypes.setSelectedTodoItem, store.state.selectedTodoItem)
        openRemoveConfirmOverlay()
      }
    }

    const handleRemovedTodoItem = (todoItemId: string) => {
      closeRemoveConfirmaOverlay()
      store.commit(MutationTypes.setSelectedTodoItem, undefined)
    }

    return {
      ActionButtonType,
      openAddTodoOverlay,
      closeAddTodoOverlay,
      openEditTodoOverlay,
      closeEditTodoOverlay,
      handleRemovedTodoItem,
      closeRemoveConfirmaOverlay,
      editTodo,
      removeTodo,
      isSelected,
      store,
      listComponent,
    }
  }
})
</script>

<template>
  <nav-bar>
    <tag-selector />
    <todo-header :list="listComponent?.list ?? []" />
    <todo-list ref="listComponent" />
    <action-button :type="ActionButtonType.BOTTOM">
      <action-button-item @click="openAddTodoOverlay"><icon icon="plus-circle" size="2x" /></action-button-item>
      <action-button-item @click="openEditTodoOverlay" v-if="isSelected"><icon icon="edit" size="2x" /></action-button-item>
      <action-button-item @click="removeTodo" v-if="isSelected"><icon icon="trash-alt" size="2x" /></action-button-item>
    </action-button>
    <add-todo-item-overlay
      title="Add a new todo"
      @onAdded="closeAddTodoOverlay"
    />
    <edit-todo-item-overlay
      title="Edit todo itemo"
      :todoItem="store.state.selectedTodoItem"
      @onUpdated="closeEditTodoOverlay"
    />
    <remove-todo-item-overlay
      :title="store.state.selectedTodoItem?.name ?? ''"
      :todoItem="store.state.selectedTodoItem"
      @onCancel="closeRemoveConfirmaOverlay"
      @onRemove="handleRemovedTodoItem"
    />
  </nav-bar>
</template>
