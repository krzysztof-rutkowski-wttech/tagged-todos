<script lang="ts">
import { defineComponent } from 'vue'

export enum ActionButtonType { TOP = 'TOP', BOTTOM ='BOTTOM' }

export default defineComponent({
  props: {
    label: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('click')
    }

    return {
        handleClick,
        type: props.type?.toLowerCase()
    }
  },
})
</script>

<template>
    <div class="action-button" :class="type" v-on:click="handleClick">
      <span v-if="label">
        {{ label }}
      </span>
      <slot v-else></slot>
    </div>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

.action-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  &.bottom {
    color: $action-button-color-2;
    background-color: $action-button-background-2;
    bottom: 0;
    position: fixed;
    text-align: center;
    width: 100%;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
  }
  &.top {
    text-align: center;
    font-size: 1.5rem;
    background-color: $action-button-background-1;
    color: $action-button-color-1;
    cursor: pointer;
  }
  span {
    font-size: 1.5rem;
  }
}
</style>