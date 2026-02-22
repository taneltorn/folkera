import React, {useRef} from "react";
import {Tune} from "../../../../model/Tune.ts";
import ImageGallery, {GalleryItem, ImageGalleryRef} from "react-image-gallery";

interface Properties {
    tune: Tune;
}

const NotationViewer: React.FC<Properties> = ({tune}) => {

    const galleryRef = useRef<ImageGalleryRef>(null);

    const images: GalleryItem[] = tune.notation?.split(";").map(name => {
        return {
            original: `${import.meta.env.VITE_API_URL}/notations/${name}`,
            thumbnail: `${import.meta.env.VITE_API_URL}/notations/${name}`,
        }
    }) || [];

    return (
        <ImageGallery
            additionalClass="notation-gallery"
            ref={galleryRef}
            items={images}
            showNav={images.length > 1}
            showBullets={images.length > 1}
            showPlayButton={false}
            showThumbnails={false}
            showFullscreenButton={true}
            onSlide={(index) => console.log("Slid to", index)}
        />
    );
}

export default NotationViewer;
