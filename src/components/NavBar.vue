<template>
  <nav>
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <router-link :to="{ name: item.name }"> {{ item.label }}</router-link>
      </li>
    </ul>
  </nav>
  <div class="page-content">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useIsLoading from '../utils/useIsLoading'

export default defineComponent({
  setup() {
    const { isLoading } = useIsLoading();

    return {
      isLoading
    }    
  },
  data: () => { return {
    menuItems: [
      { name: 'home', label: 'Home' },
      { name: 'todos', label: 'Todo list' },
      { name: 'tags', label: 'Tags' },
      { name: 'history', label: 'History' },
    ]
  } }
})
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  width: 100%;
  font-size: 1.125rem;
  ul {
    list-style-type: none;
    display: flex;
    column-gap: 0.25rem;
    font-weight: 600;
    background-color: #4C8577;
    margin: 0;
    padding: 0;
    height: 4rem;
    li {
      padding: 1.25rem 0;
      a {
        text-decoration: none;
        color: #D7DFE0;
        padding: 1rem;
        &.router-link-active  {
          background-color: #C76D7E;
          color: #D7DFE0;
          padding: 1.25rem 1rem;
        }
      }
    }
  }
}

.page-content {
  margin: 4rem 0;
}

</style>