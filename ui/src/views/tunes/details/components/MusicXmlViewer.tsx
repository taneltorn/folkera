import React, {useEffect, useRef, useState} from "react";
import {Box, Loader} from "@mantine/core";
import {OpenSheetMusicDisplay} from "opensheetmusicdisplay";
import {Tune} from "../../../../model/Tune.ts";
import {useTranslation} from "react-i18next";
import InfoMessage from "../../../../components/InfoMessage.tsx";
import {useActiveVariant} from "../../../../hooks/useActiveVariant.tsx";

interface Props {
    tune: Tune;
}

const MusicXmlViewer: React.FC<Props> = ({tune}) => {
    const {t} = useTranslation();

    const xmls = tune.musicxml?.split(";") || [];

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const visibleContainerRef = useRef<HTMLDivElement | null>(null);

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const {index, setIndex} = useActiveVariant();

    const loadAndRender = async () => {
        setErr(null);

        if (!wrapperRef.current || !xmls[index]) return;

        const nextContainer = document.createElement("div");
        nextContainer.style.overflow = "hidden";
        nextContainer.style.padding = "0";

        try {
            setLoading(true);

            const resp = await fetch(`${import.meta.env.VITE_API_URL}/musicxml/${xmls[index]}`);
            if (!resp.ok) {
                throw new Error(`Failed to fetch MusicXML (${resp.status} ${resp.statusText})`);
            }

            const musicXmlText = await resp.text();
            if (!musicXmlText) return;

            const osmd = new OpenSheetMusicDisplay(nextContainer, {
                autoResize: true,
                drawTitle: false,
                drawSubtitle: false,
                drawComposer: false,
                drawLyricist: false,
                drawCredits: false,
                drawPartNames: false,
                drawMeasureNumbers: false,
                backend: "svg",
                drawingParameters: "compacttight",
            });

            await osmd.load(musicXmlText);

            if ((osmd as any).Sheet?.Instruments) {
                (osmd as any).Sheet.Instruments.forEach((inst: any) => {
                    inst.Name = "";
                    inst.Label = "";
                    inst.InstrumentName = "";
                });
            }

            if (osmd.EngravingRules) {
                osmd.EngravingRules.PageLeftMargin = 0;
                osmd.EngravingRules.PageRightMargin = 0;
                osmd.EngravingRules.PageTopMargin = 0;
                osmd.EngravingRules.PageBottomMargin = 0;
                osmd.EngravingRules.SystemLeftMargin = 0;
                osmd.EngravingRules.StaffDistance = 5;
            }

            osmd.zoom = 1;
            osmd.render();

            const svg = nextContainer.querySelector("svg");
            if (svg) svg.style.background = "transparent";

            if (visibleContainerRef.current && wrapperRef.current.contains(visibleContainerRef.current)) {
                wrapperRef.current.replaceChild(nextContainer, visibleContainerRef.current);
            } else {
                wrapperRef.current.appendChild(nextContainer);
            }

            visibleContainerRef.current = nextContainer;
        } catch (e: any) {
            setErr(e?.message ?? "Failed to render MusicXML");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIndex(0);
    }, [tune]);

    useEffect(() => {
        if (!xmls[index]) return;
        void loadAndRender();

        return () => {
            if (wrapperRef.current) wrapperRef.current.innerHTML = "";
        };
    }, [tune, index]);

    return (
        <Box>
            {!xmls[index] && <InfoMessage color={"blue"} title={t("page.tunes.details.notationNotYetAdded")}/>}

            {err &&
                <InfoMessage color={"red"} title={t("page.tunes.details.notationRenderingFailed")}>
                    {err}
                </InfoMessage>}

            {loading && <Loader size="sm"/>}

            <Box
                ref={wrapperRef}
                style={{
                    overflowX: "hidden",
                    overflowY: "hidden",
                    padding: 0,
                }}
            />
        </Box>
    );
};

export default MusicXmlViewer;