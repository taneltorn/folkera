import {UserRole} from "./User.ts";

export interface UserDetails {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    isUser: boolean;
    isAdmin: boolean;
}