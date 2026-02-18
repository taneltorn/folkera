export type UserDTO = {
    id: string;
    username: string;
    email: string;
    name: string;
    role: string;
    createdAt?: Date;
    modifiedAt?: Date;
}