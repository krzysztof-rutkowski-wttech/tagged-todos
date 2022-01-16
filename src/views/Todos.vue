<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '@/store'
import TodoList from '@/components/TodoList.vue'
import TagSelector from '@/components/TagSelector.vue'
import NavBar from '@/components/NavBar.vue'
import AddTodoItemOverlay, { useAddTodoItemOverlay } from '@/components/overlays/AddTodoItemOverlay.vue'
import RemoveTodoItemOverlay, { useRemoveTodoItemOverlay } from '@/components/overlays/RemoveTodoItemOverlay.vue'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'
import ActionButtonItem from '@/components/ActionButtonItem.vue'
import { computed } from '@vue/reactivity'
import { MutationTypes } from '@/store/mutation.types'

export default defineComponent({
  components: { TodoList, TagSelector, NavBar, ActionButton, ActionButtonItem, AddTodoItemOverlay, RemoveTodoItemOverlay },
  setup() {
    const [ openAddTodoOverlay, closeAddTodoOverlay ] = useAddTodoItemOverlay()
    const isSelected = computed<boolean>(() => !!store.state.selectedTodoItem?.id)
    const [ openRemoveConfirmOverlay, closeRemoveConfirmaOverlay ] = useRemoveTodoItemOverlay()

    const editTodo = () => {
      console.log('edit todo')
    }

    const removeTodo = () => {
      if (isSelected.value) {
        store.commit(MutationTypes.setSelectedTodoItem, store.state.selectedTodoItem)
        openRemoveConfirmOverlay()
      }
    }

    const handleAddedTodoItem = () => {
      closeAddTodoOverlay()
    };

    const handleRemovedTodoItem = (todoItemId: string) => {
      closeRemoveConfirmaOverlay()
    }

    return {
      ActionButtonType,
      openAddTodoOverlay,
      handleAddedTodoItem,
      handleRemovedTodoItem,
      closeRemoveConfirmaOverlay,
      editTodo,
      removeTodo,
      isSelected,
      store,
    }
  }
})
</script>

<template>
  <nav-bar>
    <tag-selector />
    <todo-list />
    <action-button :type="ActionButtonType.BOTTOM">
      <action-button-item @click="openAddTodoOverlay"><icon icon="plus-circle" size="2x" /></action-button-item>
      <action-button-item @click="editTodo" v-if="isSelected"><icon icon="edit" size="2x" /></action-button-item>
      <action-button-item @click="removeTodo" v-if="isSelected"><icon icon="trash-alt" size="2x" /></action-button-item>
    </action-button>
    <add-todo-item-overlay
      title="Add a new todo"
      @onAdded="handleAddedTodoItem"
    />
    <remove-todo-item-overlay
      :title="store.state.selectedTodoItem?.name ?? ''"
      :todoItem="store.state.selectedTodoItem"
      @onCancel="closeRemoveConfirmaOverlay"
      @onRemove="handleRemovedTodoItem"
    />
  </nav-bar>
</template>
