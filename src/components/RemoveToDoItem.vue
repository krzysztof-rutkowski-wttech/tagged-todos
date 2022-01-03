<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { store } from '@/store'
import { TodoItem } from '@/store/store.types'

export default defineComponent({
    emits: ['onCancel', 'onRemove'],
    props: {
        todoItem: {
            type: Object as PropType<TodoItem>,
            required: true,
        }
    },
    setup(props, { emit }) {
        const todoItemId = props.todoItem.id
        const todoItem = computed(() => store.getters.getTodoItemById(todoItemId))

        const remove = () => {
            store.dispatch('removeTodoItem', todoItemId)
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
})
</script>

<template>
    <div class="container">
        <div class="confirmation">
            <h2>Do you want to remove</h2>
            <h1>{{ todoItem?.name }}</h1>
            <h2>?</h2>
        </div>
        <div class="buttons">
            <button class="confirm" v-on:click="remove">Yes</button>
            <button class="cancel" v-on:click="cancel">No</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

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
    &.confirm {
        color: $dialog-confirm-color;
    }
    &.cancel{
        color: $dialog-abort-color;
    }
}
</style>