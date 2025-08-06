export interface Pagination {
    page: number;
    size: number;
    sortField?: string;
    sortDirection?: SortDirection;
}

export enum SortDirection {
    ASC = "asc",
    DESC = "desc",
}

