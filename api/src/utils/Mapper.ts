import {UserDTO} from "../model/UserDTO";

class Mapper {

    static toUserDTO(user: any): UserDTO {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            modifiedAt: user.modifiedAt,
        };
    }

    static mapFields(input: any): any {
        if (Array.isArray(input)) {
            return input.map(element => Mapper.mapFields(element));
        } else if (input !== null && typeof input === 'object') {
            if (input instanceof Date) {
                return new Date(input.toISOString());
            }
            const newObj: any = {};
            Object.keys(input).forEach((key) => {
                const camelKey = key.replace(/([-_][a-z])/ig, ($1) => {
                    return $1.toUpperCase()
                        .replace('-', '')
                        .replace('_', '');
                });
                newObj[camelKey] = Mapper.mapFields(input[key]);
            });
            return newObj;
        }
        return input;
    }
}

export default Mapper;