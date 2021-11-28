<template>
    <div class="action-button" :class="type" v-on:click="handleClick">{{ label }}</div>
</template>

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
    const label = ref(props.label)

    const handleClick = () => {
      emit('click')
    }

    return {
        label,
        handleClick,
        type: props.type?.toLowerCase()
    }    
  },
})
</script>

<style>
 .action-button.bottom {
   color: #D7DFE0;
   background-color: #c76d7e;
   bottom: 0;
   position: absolute;
   text-align: center;
   width: 100%;
   font-size: 1.25rem;
   font-weight: 600;
   padding: 1rem 0;
   cursor: pointer;
 }

 .action-button.top {
    text-align: center;
    font-size: 1.5rem;
    padding: 0.75rem;
    background-color: #9fc1b8;
    color: #4c8577;
    cursor: pointer;
  }
 </style>