<template>
  <nav>
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <router-link :to="{ name: item.name }"> {{ item.label }}</router-link>
      </li>
      <li>
        <div v-show="isLoading">@</div>
      </li>
    </ul>
  </nav>
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

<style scoped>
nav {
  font-size: 1.125rem;
}

nav ul {
    list-style-type: none;
    display: flex;
    column-gap: 0.25rem;
    font-weight: 600;
    background-color: #4C8577;
    margin: 0;
    padding: 0;
}

nav ul li {
    padding: 1rem 0;
}

nav ul li a {
    text-decoration: none;
    color: #D7DFE0;
    padding: 1rem;
}

nav ul li a.router-link-active  {
    background-color: #C76D7E;
    color: #D7DFE0;
}
</style>