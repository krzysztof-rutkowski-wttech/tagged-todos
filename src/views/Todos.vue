<script lang="ts">
import TodoList from '@/components/TodoList.vue'
import TagSelector from '@/components/TagSelector.vue'
import NavBar from '@/components/NavBar.vue'
import AddTodoItemOverlay, { useAddTodoItemOverlay } from '@/components/overlays/AddTodoItemOverlay.vue'
import ActionButton, { ActionButtonType } from '@/components/ActionButton.vue'

export default {
  components: { TodoList, TagSelector, NavBar, ActionButton, AddTodoItemOverlay },
  setup() {
    const [ openAddTodoOverlay, closeAddTodoOverlay ] = useAddTodoItemOverlay()

    const handleAddedTodoItem = () => {
      closeAddTodoOverlay()
    };
    
    return {
      ActionButtonType,
      openAddTodoOverlay,
      handleAddedTodoItem,
    }
  }
}
</script>

<template>
  <NavBar>
    <tag-selector />
    <todo-list />
    <action-button label="Add Todo item" :type="ActionButtonType.BOTTOM" @click="openAddTodoOverlay" />
    <add-todo-item-overlay title="Add a new to do" @onAdded="handleAddedTodoItem" />
  </NavBar>
</template>
