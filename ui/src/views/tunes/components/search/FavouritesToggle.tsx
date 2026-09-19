import React, {useMemo} from "react";
import {Button} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {Size} from "../../../../utils/constants.ts";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {MdFavorite, MdFavoriteBorder} from "react-icons/md";

const FavouritesToggle: React.FC = () => {

    const {t} = useTranslation();
    const {toggleFilter, filters} = useDataContext();

    const active = useMemo(() => !!filters.find(f => f.field === "favourites"), [filters]);

    return (
        <Button
            px={"xs"}
            color={"dark.9"}
            title={t(`filtering.favourites.${active ? "showAll" : "showFavourites"}`)}
            variant={"subtle"}
            onClick={() => toggleFilter({field: "favourites", value: "tunes"})}
        >
            {active ? <MdFavorite size={Size.icon.MD}/> : <MdFavoriteBorder size={Size.icon.MD}/>}
        </Button>
    );
}

export default FavouritesToggle;
