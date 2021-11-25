<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: returnPageName }"><icon icon="angle-left" size="2x" /></router-link>
      </li>
      <li class="title">
        <div>{{ title }}</div>
      </li>
    </ul>
  </nav>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    title: String,
    returnPageName: String,
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
    color: #AAA;
    padding: 0 1.25rem;
    margin: 0;
    cursor: pointer;
}

.title {
  color: #2E3138;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  margin-right: 3.5rem;
}
.content {
  background-color: #D7DFE0;
}
</style>