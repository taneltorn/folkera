import {useTranslation} from "react-i18next";
import {User} from "../../../model/User.ts";
import PaginatedTable from "./PaginatedTable.tsx";
import {Group} from "@mantine/core";
import ModifyUserButton from "./components/ModifyUserButton.tsx";
import RemoveUserButton from "./components/RemoveUserButton.tsx";
import React from "react";

interface Properties {
    users: User[];
    onChange: () => void;
}

const UserTable: React.FC<Properties> = ({users, onChange}) => {

    const {t} = useTranslation();

    return (
        <PaginatedTable
            records={users}
            columns={[
                {
                    accessor: 'id',
                    title: t("user.id"),
                },
                {
                    accessor: 'username',
                    title: t("user.username"),
                },
                {
                    accessor: 'email',
                    title: t("user.email"),
                },
                {
                    accessor: 'name',
                    title: t("user.name"),
                },
                {
                    accessor: 'role',
                    title: t("user.role"),
                    render: (user) => t(`role.${user?.role}`, {defaultValue: user?.role || "N/A"}),
                },
                {
                    accessor: 'createdAt',
                    title: t("user.createdAt"),
                },
                {
                    accessor: 'actions',
                    textAlign: 'right',
                    render: (user) => (
                        <Group gap={4} justify="right" wrap="nowrap">
                            <ModifyUserButton user={user} onChange={onChange}/>
                            <RemoveUserButton user={user} onChange={onChange}/>
                        </Group>
                    ),
                },
            ]}
            // rowExpansion={{
            //     content: ({record}) => (
            //         <Box>
            //             <UserForm initialValues={record} isEdit onSubmit={function (values: User): void {
            //                 throw new Error("Function not implemented.");
            //             }}/>
            //
            //         </Box>
            //     ),
            // }}
        />
    );
};

export default UserTable;