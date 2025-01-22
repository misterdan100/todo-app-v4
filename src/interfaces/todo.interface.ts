export interface Todo {
    id: string
    title: string
    description?: string
    dueDate?: string | Date
    status?: Status
    priority?: Priority
    projectId: string
    tags?: string[]
}

export interface TodoDB {
    id: string
    title: string
    description?: string
    createdAt: string | Date
    updatedAt: string | Date
    dueDate?: string | Date
    status: Status
    priority: Priority
    projectId: string
    tags: string[]
}


export type Priority = 'low' | 'medium' | 'high'
export type Status =   'notStarted' | 'inProgress' | 'paused' | 'done'