import {UserRole} from "../../../domain/User.ts";

export interface UserDetails {
    id: number;
    email: string;
    firstname?: string;
    lastname?: string;
    role: UserRole;
    isUser: boolean;
    isAdmin: boolean;
}