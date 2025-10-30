export enum TableActions {
    EDIT = 'edit',
    DELETE = 'delete'
}

export const TABLE_ACTIONS_ICONS = {
    [TableActions.EDIT]: 'more_vert',
    [TableActions.DELETE]: 'delete'
} as const;