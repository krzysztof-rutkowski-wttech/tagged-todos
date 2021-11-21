<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue'
import { store } from './store'

export default {
  components: { NavBar },
  mounted () {
    Promise.all([store.dispatch('loadTodos'), store.dispatch('loadTags')])
  }
}
</script>

<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
</style>
