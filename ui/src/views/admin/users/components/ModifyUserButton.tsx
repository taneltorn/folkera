import React from "react";
import {User} from "../../../../model/User.ts";
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import useUserService from "../../../../services/useUserService.ts";
import TableRowButton from "../../../../components/buttons/TableRowButton.tsx";
import UserForm from "./UserForm.tsx";

interface Properties {
    user: User;
    onChange: () => void;
}

const ModifyUserButton: React.FC<Properties> = ({user, onChange}) => {

    const {t} = useTranslation();
    const userService = useUserService();

    const onSubmit = async (values: User) => {
        if (user.id) {
            userService
                .modifyUser(user.id, {...values, password: undefined})
                .then(onChange)
                .then(modals.closeAll);
        }
    }

    const openModal = () =>
        modals.open({
            title: t("modal.modifyUser.title"),
            centered: true,
            children: (
                <UserForm
                    initialValues={user}
                    onSubmit={onSubmit}
                    isEdit
                />
            ),
        });

    return (
        <TableRowButton type={"modify"} onClick={openModal}/>
    );
}

export default ModifyUserButton;
