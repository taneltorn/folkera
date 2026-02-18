import {UserRole} from "./User.ts";

export interface UserDetails {
    id: number;
    username: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: Date;
    isUser: boolean;
    isAdmin: boolean;
}