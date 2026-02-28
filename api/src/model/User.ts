export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
    name: string;
    role: UserRole;
    createdAt?: Date;
    modifiedAt?: Date;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    RESEARCHER = 'RESEARCHER',
    USER = 'USER',
}