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
        <RemoveToDoItem :todoItem="selectedTodoItem" @onCancel="handleOverlayClose" @onRemove="handleTodoItemRemoved" />
    </Overlay>
    <Overlay id="add-todo-overlay" title="Add new to do">
        <AddTodoItem @onAdded="handleAddedTodoItem"/>
    </Overlay>
</template>

<script lang="ts">
import { ref, watch, defineComponent } from 'vue'
import { store } from '../store'
import { TodoItem, TodoItemState } from '../store/store.types'
import Overlay, { useOverlay } from './Overlay.vue'
import RemoveToDoItem from './RemoveToDoItem.vue'
import ActionButton, { ActionButtonType } from '../components/ActionButton.vue'
import AddTodoItem from '../components/AddTodoItem.vue'

export default defineComponent({
    components: { Overlay, RemoveToDoItem, ActionButton, AddTodoItem },
    setup() {
        const list = ref<TodoItem[]>([
            ...store.getters.waitingTodos,
            ...store.getters.doneTodos,
        ]);

        const waitingTodosCount = ref<number>(store.getters.waitingTodos.length)
        const doneTodosCount = ref<number>(store.getters.doneTodos.length)

        watch(() => store.state.todos, () => {
            waitingTodosCount.value = store.getters.waitingTodos.length
            doneTodosCount.value = store.getters.doneTodos.length
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

        const [ openAddTodoOverlay, closeAddTodoOverlay ] = useOverlay('add-todo-overlay');
        const [ openRemoveConfirmOverlay, closeRemoveConfirmaOverlay ] = useOverlay('remove-overlay');

        const handleAdd = () => {
            openAddTodoOverlay()
        }

        const remove = (todoItem: TodoItem) => {
            selectedTodoItem.value = todoItem
            openRemoveConfirmOverlay()
        };

        const handleOverlayClose = () => {
            closeRemoveConfirmaOverlay()
        }

        const handleTodoItemRemoved = (todoItemId: string) => {
            const index = list.value.findIndex( (item: TodoItem) => item.id === todoItemId )
            if (index >= 0) list.value.splice(index, 1)
            closeRemoveConfirmaOverlay()
        }

        const handleAddedTodoItem = () => {
            closeAddTodoOverlay()
        };

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
            handleAddedTodoItem,
            selectedTodoItem,
            ActionButtonType,
        };
    },
})
</script>

<style lang="scss" scoped>
@import '../styles/colours.scss';

h2.header {
  text-align: center;
  font-size: 1.25rem;
}

.todo-count {
  color: $no-color;
}

.done-count {
  color: $yes-color
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
    border-bottom: 1px solid $list-item-divider;
    &:first-child {
      border-top: 1px solid $list-item-divider;
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
    font-size: .875rem;
    font-weight: 600;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  }
  .do-btn {
    background-color: $side-button-background-1;
    color: $side-button-color-1;
    border: 1px solid $side-button-border-color-1;
    margin-left: -3rem;
    text-align: right;
    padding-right: 2rem;
  }
  .remove-btn {
    background-color: $side-button-background-2;
    color: $side-button-color-2;
    border: 1px solid $side-button-border-color-2;
    margin-right: -3rem;
    text-align: left;
    padding-left: 1.75rem;
    font-size: 0.75rem;
  }
  .done {
    color: $list-item-grayed-color;
    background-color: $list-item-grayed-background;
    .do-btn {
      border: 1px solid $side-button-border-color-geayed;
      cursor: unset;
      background-color: $side-button-background-grayed;
      color: $side-button-color-grayed;
    }
  }
}
</style>