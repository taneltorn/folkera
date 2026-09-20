import React from "react";
import {Button, ButtonProps, Tooltip} from '@mantine/core';
import {Tune} from "../../../../model/Tune.ts";
import {useTranslation} from "react-i18next";
import useFavouritesService from "../../../../hooks/useFavouritesService.ts";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import {MdFavoriteBorder, MdOutlineFavorite} from "react-icons/md";
import {Size} from "../../../../utils/constants.ts";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";

interface Properties extends ButtonProps {
    tune: Tune;
}

const ToggleFavouriteButton: React.FC<Properties> = ({tune, ...props}) => {

    const {t} = useTranslation();

    const {currentUser} = useAuth();
    const {addFavourite, removeFavourite, isLoading} = useFavouritesService();
    const {loadData} = useDataContext();

    const isFavourite = currentUser?.favourites.tunes.includes(tune.id) ?? false;

    const toggleFavourite = async () => {
        await (isFavourite ? removeFavourite : addFavourite)(tune.id);
        await loadData();
    };

    return (
        <Tooltip label={t(`button.${isFavourite ? "removeFromFavourites" : "addToFavourites"}`)}>
            <Button
                radius={"xl"}
                color={"dark"}
                variant={"transparent"}
                loading={isLoading}
                loaderProps={{type: "dots"}}
                onClick={toggleFavourite}
                {...props}

            >
                {isFavourite
                    ? <MdOutlineFavorite size={Size.icon.MD}/>
                    : <MdFavoriteBorder size={Size.icon.MD}/>}
            </Button>
        </Tooltip>
    );
}

export default ToggleFavouriteButton;
