<script lang="ts">
import { defineComponent } from 'vue'
import Overlay, { useOverlay } from '@/components/overlays/Overlay.vue'
import RemoveToDoItem from '@/components/RemoveToDoItem.vue'

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
    <Overlay id="remove-todo-item-overlay" :title="title">
        <RemoveToDoItem :todoItem="selectedTodoItem" v-bind="$attrs" />
    </Overlay>
</template>
