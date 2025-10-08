import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Markdown from "react-markdown";
import Page from "./Page.tsx";
import {Box, Title} from "@mantine/core";

const ChangeLog: React.FC = () => {

    const {t} = useTranslation();
    const [changelog, setChangelog] = useState<string>("");

    useEffect(() => {
        fetch("/CHANGELOG.md")
            .then(response => response.text())
            .then(text => {
                setChangelog(text);
            });
    }, []);

    return (
        <Page title={t("page.title.changelog")}>
            <Box px={"md"}>
                <Title order={2} mb={"md"}>
                    {t("page.title.changelog")}
                </Title>

                <Markdown>{changelog}</Markdown>
            </Box>
        </Page>
    );
}

export default ChangeLog;