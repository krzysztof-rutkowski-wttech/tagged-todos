<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        onClick: {
            type: Function as PropType<(mouseEvent: MouseEvent) => void>,
            required: false,
        }
    },
})
</script>

<template>
    <button
        @click="(mouseEvent) => { mouseEvent.stopPropagation(); mouseEvent.preventDefault(); onClick && onClick(mouseEvent) }"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    min-height: 3.75rem;
    border: 0;
    background-color: $new-tag-button-background;
    color: $new-tag-button-color;
    font-size: 1.25rem;
    padding: 0.75rem 0;
}
</style>