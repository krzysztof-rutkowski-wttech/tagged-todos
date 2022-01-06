<template>
    <Overlay id="add-todo-overlay" :title="title">
        <AddTodoItem v-bind="$attrs"/>
    </Overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Overlay, { useOverlay } from '@/components/overlays/Overlay.vue'
import AddTodoItem from '@/components/AddTodoItem.vue'

export default defineComponent({
    inheritAttrs: false,
    props: [ 'title', 'selectedTodoItem'],
    components: { Overlay, AddTodoItem },
});

export const useAddTodoItemOverlay = () => {
    return useOverlay('add-todo-overlay')
}
</script>
