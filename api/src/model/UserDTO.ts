import {Favourites} from "./Favourites";

export type UserDTO = {
    id: string;
    username: string;
    email: string;
    name: string;
    role: string;
    accessRefs: string[];
    favourites: Favourites;
    createdAt?: Date;
    modifiedAt?: Date;
}