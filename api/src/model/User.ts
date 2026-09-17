export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
    name: string;
    role: UserRole;
    accessRefs: string[];
    createdAt?: Date;
    modifiedAt?: Date;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    RESEARCHER = 'RESEARCHER',
    USER = 'USER',
}