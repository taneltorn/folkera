import {createContext} from 'react';
import {UserDetails} from "../model/UserDetails.ts";

export interface AuthContextProperties {
    currentUser: UserDetails | null | undefined;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
    verify: () => void;
}

export const AuthContext = createContext<AuthContextProperties | undefined>(undefined);
