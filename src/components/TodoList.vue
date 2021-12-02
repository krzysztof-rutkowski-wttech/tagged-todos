<template>
    <h2 class="header">
        <div v-if="isDone()">
            <span class="done-count">Well done !</span>
        </div>
        <div v-else>
            to do: <span class="todo-count">{{ waitingTodosCount }}</span> |
            done: <span class="done-count">{{ doneTodosCount }}</span>
        </div>
    </h2>
    <ul class="todo-list">
        <li :class="[ todo.state === TodoItemState.DONE && 'done' ]" v-for="todo in list" :key="todo.id">
            <div class='line-1'>
                <button class="do-btn" @click="todo.state === TodoItemState.WAITING && setAsDone(todo.id)">
                    <icon v-if="todo.state === TodoItemState.DONE" icon="check-circle" size="2x" />
                    <icon v-if="todo.state === TodoItemState.WAITING" icon="play-circle" size="2x" />
                </button>
                <div class="name">{{ todo.name }}</div>
                <button class="remove-btn" @click="remove(todo)">
                    <icon icon="trash-alt" size="2x" />
                </button>
            </div>
            <div v-if="todo.description" class='line-2'>{{ todo.description }}</div>
        </li>
    </ul>
    <ActionButton label="Add Todo item" :type="ActionButtonType.BOTTOM" @click="handleAdd"/>
    <Overlay id="remove-overlay" :title="selectedTodoItem?.name">
        <RemoveToDoItem :todoItem="selectedTodoItem" @OnCancel="handleOverlayClose" @onRemove="handleTodoItemRemoved" />
    </Overlay>
    <Overlay id="add-todo-overlay" title="Add new to do">Adding a new tag</Overlay>
</template>

<script lang="ts">
import { ref, watch, defineComponent } from 'vue'
import { store } from '../store'
import { TodoItem, TodoItemState } from '../store/store.types'
import Overlay, { useOverlay } from './Overlay.vue'
import RemoveToDoItem from './RemoveToDoItem.vue'
import ActionButton, { ActionButtonType } from '../components/ActionButton.vue'

export default defineComponent({
    components: { Overlay, RemoveToDoItem, ActionButton },
    setup() {
        const list = ref<TodoItem[]>([
            ...store.getters.waitingTodos,
            ...store.getters.doneTodos,
        ]);

        const waitingTodosCount = ref<number>(store.getters.waitingTodos.length);
        const doneTodosCount = ref<number>(store.getters.doneTodos.length);

        watch(() => store.state.todos, () => {
            waitingTodosCount.value = store.getters.waitingTodos.length;
            doneTodosCount.value = store.getters.doneTodos.length;
            if (list.value.length > 0)
                return;
            list.value = [
                ...store.getters.waitingTodos,
                ...store.getters.doneTodos,
            ]
        })

        const selectedTodoItem = ref<TodoItem>({
            id: '',
            name: '',
            state: TodoItemState.WAITING,
        })

        const [ openOverlay, closeOverlay ] = useOverlay();

        const handleAdd = () => {
            openOverlay('add-todo-overlay')
        }

        const remove = (todoItem: TodoItem) => {
            selectedTodoItem.value = todoItem
            openOverlay('remove-overlay')
        };

        const handleOverlayClose = () => {
            closeOverlay('remove-overlay')
        }

        const handleTodoItemRemoved = (todoItemId: string) => {
            const index = list.value.findIndex( (item: TodoItem) => item.id === todoItemId )
            if (index >= 0) list.value.splice(index, 1)
            closeOverlay('remove-overlay')
        }

        const setAsDone = (todoId: string) => {
            store.dispatch("setTodoItemAsDone", todoId)
                .catch((error) => {
                    console.log(error)
                });
        };

        const isDone = () => !list.value.find((item: TodoItem) => item.state !== TodoItemState.DONE)

        return {
            list,
            TodoItemState,
            remove,
            setAsDone,
            isDone,
            waitingTodosCount,
            doneTodosCount,
            handleAdd,
            handleOverlayClose,
            handleTodoItemRemoved,
            selectedTodoItem,
            ActionButtonType,
        };
    },
})
</script>

<style lang="scss" scoped>
  h2.header {
    text-align: center;
    font-size: 1.25rem;
  }

  .todo-count {
    color: #c76d7e;
  }

  .done-count {
    color: #4C8577;
  }
  ul.todo-list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
  }

  .todo-list {
    li {
      display: flex;
      flex-direction: column;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #bbb;
      &:first-child {
        border-top: 1px solid #bbb;
      }
    }
    .line-1 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .line-2 {
      margin-top: 1rem;
    }
    .name {
      flex-grow: 1;
      margin: 0 1rem;
      font-size: 1.75rem;
      align-self: center;
      padding-left: .75rem;
    }
    button {
      width: 7rem;
      padding: 1.25rem 3rem;
      cursor: pointer;
      border-radius: 2rem;
      background-color: #e5e8e9;
      font-size: .875rem;
      font-weight: 600;
      box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    }
    .do-btn {
      background-color: #4C8577;
      color: #e5e8e9;
      border: 1px solid #4c8577;
      margin-left: -3rem;
      text-align: right;
      padding-right: 2rem;
    }
    .remove-btn {
      color: #c76d7e;
      border: 1px solid #c76d7e;
      margin-right: -3rem;
      text-align: left;
      padding-left: 1.75rem;
      font-size: 0.75rem;
    }
    .done {
      color: #aaa;
      background-color: #e5e8e9;
      .do-btn {
        border: 1px solid #aaa;
        cursor: unset;
        background-color: #e5e8e9;
        color: #aaa;
      }
    }
  }
</style>