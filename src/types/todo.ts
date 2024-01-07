export enum Status {
    DONE = 'done',
    IN_PROGRESS = 'in progress',
    AWAIT_EXECUTION = 'awaits execution'
}

export interface Todo {
    _id?: number;
    title: string;
    text: string;
    status: Status;
}