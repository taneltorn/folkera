export interface User {
    id?: number;
    email: string;
    password?: string;
    name: string;
    role: UserRole;
    createdAt?: Date;
    modifiedAt?: Date;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}