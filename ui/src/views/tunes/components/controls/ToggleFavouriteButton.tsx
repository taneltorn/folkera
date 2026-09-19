import React from "react";
import {Button, Loader} from '@mantine/core';
import {Tune} from "../../../../model/Tune.ts";
import {useTranslation} from "react-i18next";
import useFavouritesService from "../../../../hooks/useFavouritesService.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import {MdFavoriteBorder, MdOutlineFavorite} from "react-icons/md";
import {Size} from "../../../../utils/constants.ts";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";

interface Properties {
    tune: Tune;
    children?: React.ReactNode;
}

const ToggleFavouriteButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();

    const {currentUser} = useAuth();

    const {
        addFavourite,
        removeFavourite,
        isLoading
    } = useFavouritesService();

    const dataContext = useDataContext();

    const isFavourite = currentUser?.favourites.tunes.includes(tune.id) ?? false;

    const toggleFavourite = async () => {
        if (isFavourite) {
            await removeFavourite(tune.id);
        } else {
            await addFavourite(tune.id);
        }
        dataContext.loadData();
    };

    return (
        <Button
            size={"sm"}
            color={"dark.9"}
            radius={"xl"}
            variant={"subtle"}
            onClick={toggleFavourite}
            leftSection={isLoading || dataContext.isLoading ?<Loader size={20}/> :  (isFavourite ? <MdOutlineFavorite size={Size.icon.MD}/> : <MdFavoriteBorder size={Size.icon.MD}/>)}
        >
            {t(`button.${isFavourite ? "removeFromFavourites" : "addToFavourites"}`)}
        </Button>
    );
}

export default ToggleFavouriteButton;
