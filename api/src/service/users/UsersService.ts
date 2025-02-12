import {Result} from "../../model/Result";
import {User} from "../../../../domain/User";

interface UsersService {
    findByEmail: (email: string) => Promise<Result<User>>
}

export default UsersService;
