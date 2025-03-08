import React from "react";
import {useTranslation} from "react-i18next";
import {Box, Tabs, Text} from "@mantine/core";
import Page from "../../Page.tsx";
import UserList from "./users/UserList.tsx";
import {FaUser} from "react-icons/fa";
import {Size} from "../../utils/constants.ts";

const Admin: React.FC = () => {

    const {t} = useTranslation();

    return (
        <Page title={t("page.title.admin")}>
            <Box mx={"md"}>
                <Tabs defaultValue="users" radius={"xs"}>
                    <Tabs.List>
                        <Tabs.Tab value="users" leftSection={<FaUser size={Size.icon.XS}/>}>
                            <Text size={"lg"}>
                                {t("view.admin.tab.users")}
                            </Text>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="users">
                        <UserList/>
                    </Tabs.Panel>
                </Tabs>
            </Box>

        </Page>
    );
}

export default Admin;
