<script lang="ts">
import { defineComponent } from 'vue'
import Overlay, { useOverlay } from '@/components/overlays/Overlay.vue'
import RemoveToDoItem from '@/components/RemoveTodoItem.vue'

export default defineComponent({
    inheritAttrs: false,
    props: [ 'title', 'selectedTodoItem' ],
    components: { Overlay, RemoveToDoItem },
});

export const useRemoveTodoItemOverlay = () => {
    return useOverlay('remove-todo-item-overlay')
}
</script>

<template>
    <overlay id="remove-todo-item-overlay" :title="title">
        <remove-to-do-item :todoItem="selectedTodoItem" v-bind="$attrs" />
    </overlay>
</template>
