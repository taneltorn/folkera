import {Result} from "../../model/Result";
import {Notification} from "../../model/Notification";

interface NotificationService {
    findAll: () => Promise<Result<Notification[]>>
    findActive: () => Promise<Result<Notification[]>>
    findById: (id: number) => Promise<Result<Notification>>
    insert: (data: Notification) => Promise<Result<any>>
    update: (id: number, data: Notification) => Promise<Result<any>>
    deleteById: (id: number) => Promise<Result<any>>
}

export default NotificationService;
