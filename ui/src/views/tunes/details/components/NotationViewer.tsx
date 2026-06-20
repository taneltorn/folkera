import React, {useRef} from "react";
import {Tune} from "../../../../model/Tune.ts";
import LightGallery from "lightgallery/react";
import {LightGallery as LightGalleryInstance} from "lightgallery/lightgallery";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgThumbnail from "lightgallery/plugins/thumbnail";

import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-fullscreen.css";

interface Properties {
    tune: Tune;
    children: (open: () => void) => React.ReactNode;
}

const NotationViewer: React.FC<Properties> = ({tune, children}) => {
    const galleryRef = useRef<LightGalleryInstance | null>(null);

    const images = tune.notation
        ?.split(";")
        .map(name => name.trim())
        .filter(Boolean)
        .map(name => ({
            src: `${import.meta.env.VITE_API_URL}/notations/${name}`,
            thumb: `${import.meta.env.VITE_API_URL}/notations/${name}`,
        })) || [];

    const open = () => {
        galleryRef.current?.openGallery(0);
    };

    if (!images.length) return null;

    return (
        <>
            {children(open)}

            <LightGallery
                dynamic
                dynamicEl={images}
                plugins={[lgZoom, lgFullscreen, lgThumbnail]}
                download={true}
                mobileSettings={{
                    controls: true,
                    showCloseIcon: true,
                    download: true,
                }}
                thumbnail={images.length > 1}
                animateThumb
                speed={0}
                startAnimationDuration={0}
                backdropDuration={0}
                counter={images.length > 1}
                closable
                onInit={(detail) => {
                    galleryRef.current = detail.instance;
                }}
            />
        </>
    );
};

export default NotationViewer;