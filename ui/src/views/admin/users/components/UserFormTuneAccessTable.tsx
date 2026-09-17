import React from "react";
import {useTranslation} from "react-i18next";
import {Table, TextInput} from "@mantine/core";
import IconButton from "../../../../components/buttons/IconButton.tsx";
import AddButton from "../../../../components/buttons/AddButton.tsx";

interface Properties {
    accessRefs: string[];
    error?: React.ReactNode;
    onAdd: () => void;
    onChange: (index: number, value: string) => void;
    onRemove: (index: number) => void;
}

const UserFormTuneAccessTable: React.FC<Properties> = ({
                                                           accessRefs,
                                                           error,
                                                           onAdd,
                                                           onChange,
                                                           onRemove
                                                       }) => {

    const {t} = useTranslation();

    return (
        <>
            <Table withRowBorders={false} mt={"xl"}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            {t("tuneAccess.accessRef")}
                        </Table.Th>
                        <Table.Th/>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {accessRefs.map((accessRef, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>
                                <TextInput
                                    value={accessRef}
                                    variant={"filled"}
                                    error={!accessRef.trim() ? error : undefined}
                                    onChange={event =>
                                        onChange(
                                            index,
                                            event.currentTarget.value
                                        )
                                    }
                                />
                            </Table.Td>
                            <Table.Td>
                                <IconButton
                                    type="remove"
                                    onClick={() => onRemove(index)}
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <AddButton label={t("button.addNew")} onClick={onAdd}/>
        </>
    );
};

export default UserFormTuneAccessTable;