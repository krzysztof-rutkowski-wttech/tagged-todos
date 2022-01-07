<script lang="ts">
import { defineComponent, ref } from 'vue'

export enum ActionButtonType { TOP = 'TOP', BOTTOM ='BOTTOM' }

export default defineComponent({
  props: {
    label: String,
    type: String
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
    <div class="action-button" :class="type" v-on:click="handleClick">{{ label }}</div>
</template>

<style lang="scss" scoped>
@import '@styles/colours.scss';

 .action-button {
   &.bottom {
    color: $action-button-color-2;
    background-color: $action-button-background-2;
    bottom: 0;
    position: fixed;
    text-align: center;
    width: 100%;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 1rem 0;
    cursor: pointer;
  }
   &.top {
    text-align: center;
    font-size: 1.5rem;
    padding: 0.75rem;
    background-color: $action-button-background-1;
    color: $action-button-color-1;
    cursor: pointer;
  }
 }
 </style>