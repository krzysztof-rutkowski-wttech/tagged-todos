<template>
  <h1>Todo tags</h1>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <div>{{ todo.name }}</div>
      <button @click="done">done</button>
      <button @click="remove">remove</button>
      <div>{{ todo.description }}</div>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  data: () => { return {
    todos: [
      { id: 'todo-1', name: 'tomatoe', description: 'buy yellow tomatoe' },
      { id: 'todo-2', name: 'chocolate', description: '80% chocolate' },
      { id: 'todo-3', name: 'hammer', description: '' },
      { id: 'todo-4', name: 'soil flower', description: '' },
    ]
  } },
  methods: {
    done: () => { console.log('delete') },
    remove: () => { console.log('remove') }
  }
};
</script>
