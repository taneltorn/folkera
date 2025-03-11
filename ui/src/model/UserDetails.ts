import {UserRole} from "./User.ts";

export interface UserDetails {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    createdAt: Date;
    isUser: boolean;
    isAdmin: boolean;
}