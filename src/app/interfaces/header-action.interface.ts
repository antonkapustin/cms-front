export interface HeaderAction {
    type: HeaderEventType,
    payload?: any
}

export enum HeaderEventType {
    ADD_NEW = 'ADD_NEW',
    SEARCH = "SEARCH"
}