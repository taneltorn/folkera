export interface ApiResponse<T> {
    data: T[];
    page: {
        number: number;
        size: number;
        totalItems: number;
        totalPages: number;
    };
}