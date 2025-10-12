export interface Result<T> {
    success: boolean;
    data?: T;
    error?: string;
    detail?: string;
    page?: {
        number: number;
        size: number;
        totalItems: number;
        totalPages: number;
    };
}