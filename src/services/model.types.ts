export enum TodoItemState { WAITING = 'WAITING', DONE = 'DONE' }
export enum TagType { FIXED = 'FIXED', 'NORMAL' = 'NORMAL' }

export enum Status {
    ERROR,
    OK
}

export interface TodoItemModel {
    id: string,
    name: string,
    description?: string,
    state: TodoItemState,
    tags: string[],
}

export interface NewTodoItemModel {
    name: string,
    description?: string,
    tags: string[],
}

export interface TagModel {
    id: string,
    name: string,
    type: TagType,
    description: string,
}

export interface TagNodeMOdel {
    tagId: string,
    tags?: TagNodeMOdel[],
}

export interface TodoListModel {
    todos: TodoItemModel[]
}

export interface TagsModel {
    tags: TagModel[],
    tagTree: TagNodeMOdel[],
}
