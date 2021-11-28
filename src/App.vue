<template>
  <router-view/>
  <div v-show="isLoading" class="isLoading">please wait...</div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import { store } from './store'
import useIsLoading from './utils/useIsLoading'
import Overlay from './components/Overlay.vue'

export default {
    setup() {
        const { isLoading } = useIsLoading()
        const overlay = ref<Object | null>(null)

        watch(() => store.state.overlay, (data) => {
          console.log("value changes detected", data)
          overlay.value = data
        });

        return {
            isLoading,
            overlay,
        };
    },
    mounted() {
        Promise.all([
            store.dispatch("loadTodos"),
            store.dispatch("loadTags"),
        ]);
    },
    components: { Overlay }
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
