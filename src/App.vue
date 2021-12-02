<template>
  <router-view/>
  <div v-show="isLoading" class="isLoading">please wait...</div>
</template>

<script lang="ts">
import { store } from './store'
import useIsLoading from './utils/useIsLoading'

export default {
    setup() {
        const { isLoading } = useIsLoading()

        return {
            isLoading,
        };
    },
    mounted() {
        Promise.all([
            store.dispatch("loadTodos"),
            store.dispatch("loadTags"),
        ]);
    },
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
