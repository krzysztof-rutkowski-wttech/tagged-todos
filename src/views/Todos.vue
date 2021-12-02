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