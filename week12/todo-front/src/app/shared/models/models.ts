export interface ITaskList {
    id: number,
    name: string,
}

export interface ITaskOne {
    id: number,
    name: string,
    status: string
}

export interface ITaskMore {
    id: number,
    name: string,
    created_at: string,
    due_on: string,
    status: string
}

export interface ITaskNew {
    id: number,
    name: string,
    created_at: string,
    due_on: string,
    status: string,
}