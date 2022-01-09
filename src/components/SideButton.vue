<script lang="ts">
import { defineComponent, PropType } from 'vue'


export default defineComponent({
    props: {
        left: {
            type: Boolean,
            required: false,
        },
        right: {
            type: Boolean,
            required: false,
        },
        colorPrimary: {
            type: Boolean,
            required: false,
        },
        colorSecondary: {
            type: Boolean,
            required: false,
        },
        colorGrayed: {
            type: Boolean,
            required: false,
        },
        onClick: {
            type: Function as PropType<(payload: MouseEvent) => void>,
            required: false,
        }
    },
})
</script>

<template>
    <button 
        :class="{ left, right, 'color-grayed': colorGrayed, 'color-primary': colorPrimary, 'color-secondary': colorSecondary }" 
        @click="(payload) => { payload.stopPropagation(); onClick && onClick(payload) }"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

button {
    width: 7rem;
    padding: 1.25rem 3rem;
    cursor: pointer;
    border-radius: 2rem;
    font-size: .875rem;
    font-weight: 600;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

    &.color-primary {
        background-color: $side-button-background-1;
        color: $side-button-color-1;
        border: 1px solid $side-button-border-color-1;
    }

    &.color-secondary {
        background-color: $side-button-background-2;
        color: $side-button-color-2;
        border: 1px solid $side-button-border-color-2;
    }

    &.color-grayed {
        background-color: $side-button-background-grayed;
        color: $side-button-color-grayed;
        border: 1px solid $side-button-border-color-geayed;
        cursor: unset;
    }

    &.left {
        margin-left: -3rem;
        text-align: right;
        padding-right: 2rem;
    }

    &.right {
        margin-right: -3rem;
        text-align: left;
        padding-left: 1.75rem;
        font-size: 0.75rem;
    }
}
</style>