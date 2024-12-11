
export enum TaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus
}
  
export interface TaskResponse {
    data: Task | Task[] | boolean | null
    error: string | null 
}