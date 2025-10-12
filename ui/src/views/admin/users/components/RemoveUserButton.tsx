import React from "react";
import {User} from "../../../../model/User.ts";
import {Text} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useTranslation} from "react-i18next";
import useUserService from "../../../../services/useUserService.ts";
import TableRowButton from "../../../../components/buttons/TableRowButton.tsx";

interface Properties {
    user: User;
    onChange: () => void;
}

const RemoveUserButton: React.FC<Properties> = ({user, onChange}) => {

    const {t} = useTranslation();
    const {removeUser} = useUserService();

    const openModal = () =>
        modals.openConfirmModal({
            title: t("modal.removeUser.title"),
            centered: true,
            children: (
                <Text size={"sm"}>
                    {t("modal.removeUser.content")}
                </Text>
            ),
            labels: {
                confirm: t("modal.removeUser.confirm"),
                cancel: t("modal.removeUser.cancel")
            },
            confirmProps: {color: 'red'},
            onCancel: () => console.log('Cancel'),
            onConfirm: () => user.id && removeUser(user.id).then(onChange),
        });

    return (
        <TableRowButton type={"remove"} onClick={openModal}/>
    );
}

export default RemoveUserButton;
