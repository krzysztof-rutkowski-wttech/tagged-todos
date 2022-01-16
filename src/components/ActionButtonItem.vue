<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['click'],
    setup(_, { emit }) {
    const handleClick = () => {
        emit('click')
    }

    return {
        handleClick,
    }
    },
})
</script>

<template>
    <div class="action-button-item" @click="handleClick">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

.action-button-item {
    flex-grow: 1;
    font-size: 1rem;
}
</style>