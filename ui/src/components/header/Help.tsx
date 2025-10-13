import React from "react";
import {Trans, useTranslation} from "react-i18next";
import {Button, Group, List, Modal, Text, Title} from "@mantine/core";
import {Size} from "../../utils/constants.ts";
import {RiQuestionFill} from "react-icons/ri";
import {useDisclosure} from "@mantine/hooks";
import packageJson from '../../../package.json';
import {FaBug, FaInfo} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Help: React.FC = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const [opened, {open, close}] = useDisclosure(false);

    const handleNavigate = () => {
        navigate("/changelog");
        close();
    }

    return (
        <>
            <Modal
                size={"lg"}
                title={<Title order={4}>{t("page.help.title")}</Title>}
                opened={opened}
                onClose={close}
            >
                <List spacing={"xl"}
                      size="lg">
                    <List.Item icon={<FaInfo size={Size.icon.XL}/>}>
                        <Text ml={"md"}>
                            {t("page.help.description")}
                        </Text>
                    </List.Item>
                    <List.Item icon={<FaBug size={Size.icon.XL}/>}>
                        <Text ml={"md"}>
                            <Trans i18nKey={"page.help.contact"} values={{email: import.meta.env.VITE_CONTACT_EMAIL}}/>
                        </Text>
                    </List.Item>
                </List>

                <Group mt={"md"}>
                    <Text>{t("page.help.version")}</Text>
                    <Button
                        px={"md"}
                        title={t("page.help.navigateToChangelog")}
                        size={"compact-xs"}
                        variant={"filled"}
                        onClick={handleNavigate}
                    >
                        {packageJson.version}
                    </Button>

                </Group>
            </Modal>

            <Button
                px={4}
                size={"sm"}
                color={"blue"}
                variant={"subtle"}
                onClick={open}
            >
                <RiQuestionFill size={Size.icon.LG}/>
            </Button>
        </>
    );
};

export default Help;
