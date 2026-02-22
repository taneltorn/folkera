import React from "react";
import {Text} from "@mantine/core";
import {Tune} from "../../model/Tune.ts";
import {fullRef} from "../../utils/helpers.tsx";

interface Properties {
    tune: Tune;
}

const TuneReference: React.FC<Properties> = ({tune}) => {

    return (
        <Text size={"xl"} fw={"bold"}>
            {fullRef(tune)}
            {/*<CopyButton value={fullRef(tune)}>*/}
            {/*    {({copied, copy}) => (*/}
            {/*        <Button*/}
            {/*            px={"xs"}*/}
            {/*            ml={"xs"}*/}
            {/*            title={t("button.copyToClipboard")}*/}
            {/*            variant={"subtle"}*/}
            {/*            color={copied ? 'teal' : 'blue'}*/}
            {/*            onClick={copy}*/}
            {/*        >*/}
            {/*            <MdContentCopy size={Size.icon.SM}/>*/}
            {/*        </Button>*/}
            {/*    )}*/}
            {/*</CopyButton>*/}
        </Text>
    );
}

export default TuneReference;
