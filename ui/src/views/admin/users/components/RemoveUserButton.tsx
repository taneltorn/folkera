import React from "react";
import {User} from "../../../../model/User.ts";
import {Button, Text} from '@mantine/core';
import {modals} from '@mantine/modals';
import {RiDeleteBinLine} from "react-icons/ri";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import useUserService from "../../../../services/useUserService.ts";

interface Properties {
    user: User;
    onChange: () => void;
}

const RemoveUserButton: React.FC<Properties> = ({user, onChange}) => {

    const {t} = useTranslation();
    const {removeUser} = useUserService();

    const openRemoveUserModal = () =>
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
        <Button px={"xs"} onClick={openRemoveUserModal} variant="light">
            <RiDeleteBinLine size={Size.icon.SM}/>
        </Button>
    );
}

export default RemoveUserButton;
