import React from "react";
import {Trans, useTranslation} from "react-i18next";
import {Badge, Button, Group, List, Modal, Text} from "@mantine/core";
import {Size} from "../../utils/constants.ts";
import {RiQuestionFill} from "react-icons/ri";
import {useDisclosure} from "@mantine/hooks";
import packageJson from '../../../package.json';
import {FaBug, FaInfo} from "react-icons/fa";

const Help: React.FC = () => {

    const [t] = useTranslation();
    const [opened, {open, close}] = useDisclosure(false);

    return (
        <>
            <Modal
                size={"lg"}
                title={t("page.help.title")}
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
                    <Badge variant={"filled"}>
                        {packageJson.version}
                    </Badge>
                </Group>
            </Modal>

            <Button px={4} variant="subtle" onClick={open}>
                <RiQuestionFill size={Size.icon.LG}/>
            </Button>
        </>
    );
};

export default Help;
