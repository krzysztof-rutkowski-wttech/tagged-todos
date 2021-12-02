<template>
    <div class="container">
        <div class="confirmation">
            <h2>Do you want to remove</h2>
            <h1>{{ todoItem?.name }}</h1>
            <h2>?</h2>
        </div>
        <div class="buttons">
            <button class="confirm" v-on:click="remove(todoItem?.id)">Yes</button>
            <button class="cancel" v-on:click="cancel">No</button>
        </div>
    </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { store } from '../store'

export default {
  emits: ['onCancel', 'onRemove'],
  props: {
      todoItem: Object,
  },
  // @ts-ignore: Unreachable code error
  setup(props, { emit }) {
    const todoItemId = props.todoItem?.id ?? '';
    const todoItem = computed(() => store.getters.getTodoItemById(todoItemId))

    const remove = (todoId: string) => {
      store.dispatch('removeTodoItem', todoId)
        .then(() => {
          emit('onRemove', todoItemId)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const cancel = () => emit('onCancel')

    return {
      todoItem,
      remove,
      cancel,
    }
  },
}
</script>

<style scoped>
    .container {
        position: fixed;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .confirmation {
        text-align: center;
    }
    .buttons {
        display: flex;
        justify-content: center;
        margin-bottom: 6rem;
    }

    button {
        height: 6rem;
        width: 12rem;
        border: 0;
        background-color: transparent;
        font-size: 3rem;
        font-weight: 600;
        cursor: pointer;
    }

    button.confirm {
        color: #c76d7e;
    }

    button.cancel{
        color: #4C8577;
    }
</style>