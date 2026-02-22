import React, {useEffect, useRef, useState} from "react";
import {Box, Group, Loader, Alert} from "@mantine/core";
import {OpenSheetMusicDisplay} from "opensheetmusicdisplay";
import {Tune} from "../../../../model/Tune.ts";
import {useTranslation} from "react-i18next";
import {FaInfo} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import {IoMdAlert} from "react-icons/io";

interface Props {
    tune: Tune;
}

const MusicXmlViewer: React.FC<Props> = ({tune}) => {

    const {t} = useTranslation();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const osmdRef = useRef<OpenSheetMusicDisplay | null>(null);

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const initOrGetOsmd = () => {
        if (!containerRef.current) return null;

        if (!osmdRef.current) {
            osmdRef.current = new OpenSheetMusicDisplay(containerRef.current, {
                autoResize: true,

                drawTitle: false,
                drawSubtitle: false,
                drawComposer: false,
                drawLyricist: false,
                drawCredits: false,
                drawPartNames: false,
                drawMeasureNumbers: false,
            });

            osmdRef.current.setOptions({
                backend: "svg",
                drawingParameters: "compacttight",
            });
        }

        return osmdRef.current;
    };

    const loadAndRender = async () => {
        setErr(null);

        const osmd = initOrGetOsmd();
        if (!osmd) return;

        try {
            setLoading(true);

            if (containerRef.current) containerRef.current.innerHTML = "";

            let musicXmlText: string | undefined;

            if (tune.musicxml) {
                const resp = await fetch(`${import.meta.env.VITE_API_URL}/musicxml/${tune.musicxml}`);
                if (!resp.ok) throw new Error(`Failed to fetch MusicXML (${resp.status} ${resp.statusText})`);
                musicXmlText = await resp.text();
            }

            if (!musicXmlText) return;

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

            const svg = containerRef.current?.querySelector("svg");
            if (svg) svg.style.background = "transparent";
        } catch (e: any) {
            setErr(e?.message ?? "Failed to render MusicXML");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!tune.musicxml) return;
        void loadAndRender();

        return () => {
            if (containerRef.current) containerRef.current.innerHTML = "";
        };
    }, [tune]);

    return (
        <Box mt="md">
            {!tune.musicxml && (
                <Alert
                    maw={500}
                    color="blue"
                    title={t("view.tunes.details.notationNotYetAdded")}
                    mb="sm"
                    icon={<FaInfo size={Size.icon.MD}/>}
                />)}

            {err && (
                <Alert
                    maw={500}
                    color="red"
                    title={t("view.tunes.details.notationRenderingFailed")}
                    mb="sm"
                    icon={<IoMdAlert size={Size.icon.MD}/>}
                >
                    {err}
                </Alert>)}

            {loading && (
                <Group mb="sm" gap="xs">
                    <Loader size="sm"/>
                </Group>
            )}

            <Box
                ref={containerRef}
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