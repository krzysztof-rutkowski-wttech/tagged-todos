<template>
  <overlay-layout>
    <router-view />
  </overlay-layout>
  <!-- <router-view /> -->
  <!-- <overlay-view /> -->
  <!-- <div id='overlay-view' /> -->
  <div v-show="isLoading" class="isLoading">please wait...</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from './store'
import useIsLoading from './utils/useIsLoading'

export default defineComponent({
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
})
</script>

<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
  #app {
    overflow: hidden;
  }
  .isLoading {
    background-color: rgba(255,255,255,.75);
    color: #4C8577;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 3rem;
    font-weight: 600;
    z-index: 1;
  }
</style>
