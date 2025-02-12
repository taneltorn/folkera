export interface Result<T> {
    success: boolean;
    data: T;
    error?: {
        message: string;
        detail?: string;
    };
}