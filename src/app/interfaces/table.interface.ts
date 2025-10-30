export interface TableColumns {
    header: string;
    type?: TableCellType;
    component?: any
}
export interface TableData<T> {
    columns: TableColumns[],
    data: T
}

export enum TableCellType {
    STRING = 'string',
    COMPONENT = 'component',
    ACTIONS = 'actions'
}