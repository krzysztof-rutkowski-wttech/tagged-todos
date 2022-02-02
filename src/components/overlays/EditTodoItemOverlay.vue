<script lang="ts">
import { defineComponent } from 'vue'
import Overlay, { useOverlay } from '@/components/overlays/Overlay.vue'
import AddTodoItem from '@/components/AddTodoItem.vue'

export default defineComponent({
    inheritAttrs: false,
    props: [ 'title', 'selectedTodoItem' ],
    components: { Overlay, AddTodoItem },
});

export const useEditTodoItemOverlay = () => {
    return useOverlay('edit-todo-overlay')
}
</script>

<template>
    <overlay id="edit-todo-overlay" :title="title">
        <add-todo-item v-bind="$attrs"/>
    </overlay>
</template>
