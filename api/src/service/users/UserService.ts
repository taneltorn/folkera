import {Result} from "../../model/Result";
import {User} from "../../model/User";

interface UserService {
    findByEmail: (email: string) => Promise<Result<User>>
}

export default UserService;
