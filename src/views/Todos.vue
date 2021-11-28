<template>
  <NavBar />
  <tag-selector />
  <todo-list />
</template>

<script lang="ts">
import TodoList from '../components/TodoList.vue'
import TagSelector from '../components/TagSelector.vue'
import NavBar from '../components/NavBar.vue'

export default {
  components: { TodoList, TagSelector, NavBar },
}
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