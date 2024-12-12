export declare enum TaskStatus {
    PENDING = "pending",
    COMPLETED = "completed"
}
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}
