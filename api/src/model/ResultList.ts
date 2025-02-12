export interface ResultList<T> {
    success: boolean;
    data: T[];
    page?: {
        number: number;
        size: number;
        totalItems: number;
        totalPages: number;
    };
    error?: {
        message: string;
        detail?: string;
    };
}