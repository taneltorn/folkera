import React from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@mantine/core";
import {FaPlus} from "react-icons/fa";
import {modals} from "@mantine/modals";
import UserForm from "./UserForm.tsx";
import {User, UserRole} from "../../../../model/User.ts";
import useUserService from "../../../../services/useUserService.ts";

interface Properties {
    onChange: () => void;
}

const InitialValues: User = {
    email: "",
    name: "",
    password: "",
    role: UserRole.USER
}

const AddUserButton: React.FC<Properties> = ({onChange}) => {

    const {t} = useTranslation();
    const userService = useUserService();

    const onSubmit = async (values: User) => {
        userService
            .createUser(values)
            .then(modals.closeAll)
            .finally(onChange);
    }

    const openModal = () =>
        modals.open({
            title: t("modal.createUser.title"),
            centered: true,
            children: (
                <UserForm
                    initialValues={InitialValues}
                    onSubmit={onSubmit}
                />
            ),
        });

    return (
        <Button
            mt={"md"}
            variant={"subtle"}
            leftSection={<FaPlus/>}
            onClick={openModal}>
            {t("button.addNew")}
        </Button>
    );
}

export default AddUserButton;
