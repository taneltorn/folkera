import React from "react";
import {useTranslation} from "react-i18next";
import {modals} from "@mantine/modals";
import UserForm from "./UserForm.tsx";
import {User, UserRole} from "../../../../model/User.ts";
import useUserService from "../../../../services/useUserService.ts";
import ModalTitle from "../../../tunes/components/controls/ModalTitle.tsx";
import AddButton from "../../../../components/buttons/AddButton.tsx";
import {Flex} from "@mantine/core";

interface Properties {
    onChange: () => void;
}

const InitialValues: User = {
    username: "",
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
            title: <ModalTitle title={t("modal.createUser.title")}/>,
            centered: true,
            children: (
                <UserForm
                    initialValues={InitialValues}
                    onSubmit={onSubmit}
                />
            ),
        });

    return (
        <Flex justify={"center"}>
            <AddButton
                label={t("button.addNew")}
                onClick={openModal}
            />
        </Flex>
    );
}

export default AddUserButton;
