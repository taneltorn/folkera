import React, { ReactNode } from "react";
import { Button, Menu } from "@mantine/core";
import { useTranslation } from "react-i18next";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { Language } from "../../../../../model/Language";

const iconMap = new Map<Language, ReactNode>([
    [Language.EE, getUnicodeFlagIcon("EE")],
    [Language.EN, getUnicodeFlagIcon("GB_ENG")],
]);

const normalizeLng = (lng: string): Language => {
    const base = lng.split("-")[0]; // "en-US" -> "en"
    return (base as Language) === Language.EE ? Language.EE : Language.EN;
};

const LanguageSelector: React.FC = () => {
    const { t, i18n } = useTranslation();

    const current = normalizeLng(i18n.resolvedLanguage ?? i18n.language);

    const changeLanguage = (lng: Language) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lang", lng);
    };

    return (
        <Menu shadow="md">
            <Menu.Target>
                <Button
                    px="xs"
                    size="sm"
                    color="dark"
                    variant="subtle"
                    title={t("page.selectLanguage")}
                >
                    {iconMap.get(current)}
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                {[Language.EE, Language.EN].map((lng) => (
                    <Menu.Item
                        key={lng}
                        leftSection={iconMap.get(lng)}
                        onClick={() => changeLanguage(lng)}
                    >
                        {lng.toUpperCase()}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};

export default LanguageSelector;