<template>
  <tag-selector />
  <todo-list />
  <div v-show="isLoading" class="isLoading">please wait...</div>
</template>

<script lang="ts">
import TodoList from '../components/TodoList.vue'
import TagSelector from '../components/TagSelector.vue'
import useIsLoading from '../utils/useIsLoading'

export default {
  components: { TodoList, TagSelector },
  setup() {
      const { isLoading } = useIsLoading();

      return {
        isLoading
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