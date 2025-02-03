export interface User {
    id?: number;
    email: string;
    password?: string
    role?: UserRole
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}