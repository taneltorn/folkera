import {createContext} from 'react';
import {User} from "../../../domain/User.ts";

export interface AuthContextProperties {
    currentUser: User | null | undefined;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
    verify: () => void;
}

export const AuthContext = createContext<AuthContextProperties | undefined>(undefined);
