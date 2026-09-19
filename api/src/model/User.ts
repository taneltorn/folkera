import {Favourites} from "./Favourites";

export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
    name: string;
    role: UserRole;
    accessRefs: string[];
    favourites: Favourites;
    createdAt?: Date;
    modifiedAt?: Date;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    RESEARCHER = 'RESEARCHER',
    USER = 'USER',
}