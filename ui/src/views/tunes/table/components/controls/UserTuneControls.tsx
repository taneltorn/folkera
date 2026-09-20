import React from "react";
import {Group} from "@mantine/core";
import {Tune} from "../../../../../model/Tune.ts";
import ModifyTuneButton from "../../../components/controls/ModifyTuneButton.tsx";
import {AiFillEdit} from "react-icons/ai";
import {Size} from "../../../../../utils/constants.ts";
import {useAuth} from "../../../../../hooks/useAuth.tsx";
import {useDataContext} from "../../../../../hooks/useDataContext.tsx";
import ToggleFavouriteButton from "../../../components/controls/ToggleFavouriteButton.tsx";

interface Properties {
    tune: Tune;
    show?: boolean
}

const UserTuneControls: React.FC<Properties> = ({tune, show}) => {

    const {currentUser} = useAuth();
    const {loadData} = useDataContext();

    return (<>
            <Group gap={0} wrap={"nowrap"} style={{visibility: show ? "visible" : "hidden"}}>
                <ToggleFavouriteButton
                    tune={tune}
                    px={0}
                />

                {currentUser?.isAdmin &&
                    <ModifyTuneButton
                        tune={tune}
                        onSubmit={loadData}
                    >
                        <AiFillEdit size={Size.icon.SM}/>
                    </ModifyTuneButton>}
            </Group>
        </>
    );
}

export default UserTuneControls;
