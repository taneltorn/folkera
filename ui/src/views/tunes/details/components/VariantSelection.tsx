import React from "react";
import {Button, Group} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {useActiveVariant} from "../../../../hooks/useActiveVariant.tsx";
import {range} from "lodash";

interface Props {
    count: number;
}

const VariantSelection: React.FC<Props> = ({count}) => {

    const {t} = useTranslation();
    const {index, setIndex} = useActiveVariant();

    return (
        <Group gap={4}>
            {range(0, count).map((_, i) => (
                <Button
                    key={`variant-${i}`}
                    color={"dark"}
                    size={"compact-xs"}
                    variant={index === i ? "filled" : "subtle"}
                    onClick={() => setIndex(i)}
                >
                    {t(`button.variant`, {index: i + 1})}
                </Button>))}
        </Group>
    );
};

export default VariantSelection;