import {Favourites} from "./Favourites.ts";

export interface User {
    id: number;
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

export interface UserDetails extends User {
    isUser: boolean;
    isResearcher: boolean;
    isAdmin: boolean;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    RESEARCHER = 'RESEARCHER',
    USER = 'USER',
}