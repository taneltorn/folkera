import React from "react";
import Page from "../../Page.tsx";
import {useTranslation} from "react-i18next";
import {Box, Group, Text, Title} from "@mantine/core";
import {useAuth} from "../../hooks/useAuth.tsx";
import ChangePassword from "../../components/header/ChangePassword.tsx";
import moment from "moment";

const MyProfileView: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();

    return (
        <Page title={t("page.title.profile")}>
            <Box mx={"md"}>
                <Title order={3} mb={"md"}>
                    {t("page.title.profile")}
                </Title>

                <Group gap={"xl"}>
                    <Box>
                        <Text fz={"sm"} fw={"bold"}>
                            {t("user.name")}
                        </Text>
                        <Text>
                            {currentUser?.name}
                        </Text>
                    </Box>
                    <Box>
                        <Text fz={"sm"} fw={"bold"}>
                            {t("user.email")}
                        </Text>
                        <Text>
                            {currentUser?.email}
                        </Text>
                    </Box>
                    <Box>
                        <Text fz={"sm"} fw={"bold"}>
                            {t("user.role")}
                        </Text>
                        <Text>
                            {t(`role.${currentUser?.role}`, {defaultValue: currentUser?.role || "N/A"})}
                        </Text>
                    </Box>
                    <Box>
                        <Text fz={"sm"} fw={"bold"}>
                            {t("user.createdAt")}
                        </Text>
                        <Text>
                            {moment(currentUser?.createdAt).format("DD.MM.YYYY")}
                        </Text>
                    </Box>
                </Group>

                <Group mt={"xl"}>
                    <ChangePassword/>
                </Group>
            </Box>
        </Page>
    );
}

export default MyProfileView;
