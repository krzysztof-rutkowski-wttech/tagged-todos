<template>
  <form class="form">
    <div class="errorMessage">{{ errorMessage }}</div>
    <label for="todoItem-name">Title</label>
    <input type="text" id="todoItem-name" v-model="todoItemName" placeholder="enter title (required)"/>
    <label for="todoItem-descriptione">Description</label>
    <textarea 
      id="todoItem-description" 
      maxlength="1024" 
      placeholder="provide description (optional)"
      v-model="todoItemDescr"
    />
  </form>
  <ActionButton label="Add" :type="ActionButtonType.BOTTOM" @click="handleAdd"/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { store } from '../store'
import ActionButton, { ActionButtonType } from './ActionButton.vue'

export default defineComponent({
  components: { ActionButton },
  emits: [ 'onAdded' ],
  setup(_,  { emit }) {
    const state = reactive({
      todoItemName: '',
      todoItemDescr: '',
      errorMessage: '',
    })

    const add = async () => {
      try {
        await store.dispatch('addTodoItem', {
          name: state.todoItemName,
          description: state.todoItemDescr,
        })
        emit('onAdded')
      } catch (error) {
          state.errorMessage = 'Error storing a new todo item!'
          console.log(error)
      }
    }

    const preValidation = () => {
      if (state.todoItemName.trim() === '') {
        state.errorMessage = 'Title is empty. Please provide a title.'
        return false
      }
      state.errorMessage = ''
      return true
    }

    const handleAdd = () => {
      if (preValidation()) {
        add();
      }
    }
 
    return {
      ...toRefs(state),
      ActionButtonType,
      handleAdd,
    }
  },
})
</script>

<style lang="scss" scoped>
 .form {
   display: flex;
   flex-direction: column;
   padding: 1rem 2rem;
   label {
     font-size: 1.5rem;
     font-weight: 600;
     margin: 0.5rem 0;
     color: #4c8577;
   }
   input {
     height: 3rem;
     font-size: 1.5rem;
     padding: 0 1rem;
     margin-bottom: 2rem;
     border: 1px solid #9fc1b8;
     background-color: #edf3f1;
   }
   textarea {
     margin-bottom: 2rem;
     font-size: 1.25rem;
     padding: 0.5rem 1rem;
     height: 20rem;
     border: 1px solid #9fc1b8;
     background-color: #edf3f1;
     resize: none;
   }
   button {
     height: 2rem;
   }
   .errorMessage {
     color: #c76d7e;
     font-size: 1.25rem;
     font-weight: 600;
     height: 4rem;
     text-align: center;
   }
 }
</style>
