<template>
  <router-view />
  <div v-show="isLoading" class="isLoading">please wait...</div>
</template>

<script lang="ts">
import { store } from './store'
import Overlay from './components/Overlay.vue'
import useIsLoading from './utils/useIsLoading'

export default {
  components: { Overlay },
  setup() {
    const { isLoading } = useIsLoading()

    return {
      isLoading,
      overlayOpened: store.state.overlayOpened,
    }
  },
  mounted () {
    Promise.all([
      store.dispatch('loadTodos'),
      store.dispatch('loadTags'),
    ])
  }
}
</script>

<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
  #app {
    overflow: hidden;
  }
</style>
