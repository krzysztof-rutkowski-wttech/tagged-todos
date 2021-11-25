<template>
  <NavBar />
  <tag-selector />
  <todo-list />
  <action-button label="Add Todo item" :type="ActionButtonType.BOTTOM"/>
</template>

<script lang="ts">
import TodoList from '../components/TodoList.vue'
import TagSelector from '../components/TagSelector.vue'
import ActionButton, { ActionButtonType } from '../components/ActionButton.vue'
import NavBar from '../components/NavBar.vue'

export default {
  components: { TodoList, TagSelector, ActionButton, NavBar },
  setup() {
      return {
        ActionButtonType,
      }
  }
};
</script>

<style>
  .isLoading {
    background-color: rgba(255,255,255,.75);
    color: #4C8577;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 3rem;
    font-weight: 600;
    z-index: 1;
  }

</style>