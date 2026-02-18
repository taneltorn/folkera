import {Result} from "../../model/Result";
import {User} from "../../model/User";

interface UserService {
    findAll: () => Promise<Result<User[]>>,
    findByUsernameOrEmail: (usernameOrEmail: string) => Promise<Result<User>>,
    insert: (data: User, user: User) => Promise<Result<any>>,
    update: (id: number, data: User, user: User) => Promise<Result<any>>,
    updateUserPassword: (id: number, password: string, user: User) => Promise<Result<any>>,
    deleteById: (id: number) => Promise<Result<any>>,
}

export default UserService;
