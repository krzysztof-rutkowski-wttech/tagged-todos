<template>
  <nav>
    <ul>
      <li>
        <a v-on:click="handleClose">{==</a>
      </li>
      <li>
        <div>Overlay Title</div>
      </li>
    </ul>
  </nav>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { store } from '../store'

export default {
  setup() {
    const handleClose = () => {
      store.state.overlayOpened = false
    }

    return {
      handleClose,
    }    
  },
}
</script>

<style scoped>
nav ul {
    list-style-type: none;
    display: flex;
    column-gap: 0.25rem;
    font-weight: 600;
    background-color: #E8EEEF;
    margin: 0;
    padding: 0;
}

nav ul li {
    padding: 1rem 0;
}

nav ul li a {
    text-decoration: none;
    color: #2E3138;
    padding: 1rem;
    margin: 0;
    cursor: pointer;
}

.content {
  background-color: #D7DFE0;
}
</style>