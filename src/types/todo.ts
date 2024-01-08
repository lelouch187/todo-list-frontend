export enum Status {
    DONE = 'done',
    IN_PROGRESS = 'in progress',
    AWAIT_EXECUTION = 'awaits execution'
}

export interface Todo {
    _id?: string;
    title: string;
    text: string;
    status: Status;
}