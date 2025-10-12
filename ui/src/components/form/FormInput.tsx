import React from "react";
import {UseFormReturnType} from "@mantine/form";
import {Input, PasswordInput, Radio, Select, Textarea, TextInput} from "@mantine/core";
import {DateTimePicker} from "@mantine/dates";

interface Properties {
    name: string;
    label: string;
    type: "text" | "textarea" | "datetime" | "select" | "password" | "radio";
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    form: UseFormReturnType<any>;
}

const FormInput: React.FC<Properties> = ({form, type, name, label, options, placeholder}) => {

    return (
        <Input.Wrapper
            mb={"md"}
            label={label}
            labelProps={{mb: 4, fw: "bold"}}
        >
            {type === "text" &&
                <TextInput
                    placeholder={placeholder}
                    key={form.key(name)}
                    variant={"filled"}
                    size={"md"}
                    {...form.getInputProps(name)}
                />}
            
            {type === "radio" &&
                <Radio.Group
                    key={form.key(name)}
                    size={"md"}
                    {...form.getInputProps(name)}
                >
                    {options?.map((option) => (
                        <Radio mt={"xs"} value={option.value} label={option.label} key={option.value}/>
                    ))}
                </Radio.Group>}

            {type === "password" &&
                <PasswordInput
                    type={"password"}
                    variant={"filled"}
                    placeholder={placeholder}
                    key={form.key(name)}
                    size={"md"}
                    {...form.getInputProps(name)}
                />}

            {type === "textarea" &&
                <Textarea
                    placeholder={placeholder}
                    variant={"filled"}
                    rows={4}
                    key={form.key(name)}
                    size={"md"}
                    {...form.getInputProps(name)}
                />}
            
            {type === "datetime" &&
                <DateTimePicker
                    locale={"et"}
                    valueFormat={"DD.MM.YYYY HH:mm"}
                    variant={"filled"}
                    clearable
                    placeholder={placeholder}
                    key={form.key(name)}
                    size={"md"}
                    timePickerProps={{
                        format: '24h',
                    }}
                    {...form.getInputProps(name)}
                />}
            
            {type === "select" &&
                <Select
                    placeholder={placeholder}
                    variant={"filled"}
                    key={form.key(name)}
                    size={"md"}
                    clearable
                    data={options || []}
                    {...form.getInputProps('trainset')}
                />}
        </Input.Wrapper>
    );
}

export default FormInput;
