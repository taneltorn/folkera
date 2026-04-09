import React from "react";
import {AudioContextProvider} from "./hooks/useAudioContext.tsx";
import {ToastContextProvider} from "./hooks/useToasts.tsx";
import {ModificationsContextProvider} from "./hooks/useModifications.tsx";
import {AuthContextProvider} from "./hooks/useAuth.tsx";
import {DataContextProvider} from "./hooks/useDataContext.tsx";
import {ModalsProvider} from "@mantine/modals";
import {TuneSelectionContextProvider} from "./hooks/useTuneSelection.tsx";
import {ControlStateContextProvider} from "./hooks/useControlState.tsx";
import {AdvancedFilteringContextProvider} from "./hooks/useAdvancedFilteringContext.tsx";
import {StatsContextProvider} from "./hooks/useStatsContext.tsx";
import {ExportContextProvider} from "./hooks/useDataExport.tsx";
import {ActiveVariantContextProvider} from "./hooks/useActiveVariant.tsx";

interface Properties {
    children: React.ReactNode;
}

const ContextProviders: React.FC<Properties> = ({children}) => {


    return (
        <ToastContextProvider>
            <AuthContextProvider>
                <AudioContextProvider>
                    <ActiveVariantContextProvider>
                    <ModalsProvider>
                        <ControlStateContextProvider>
                            <TuneSelectionContextProvider>
                                <ModificationsContextProvider>
                                    <ExportContextProvider>
                                        <DataContextProvider>
                                            <StatsContextProvider>
                                                <AdvancedFilteringContextProvider>
                                                    {children}
                                                </AdvancedFilteringContextProvider>
                                            </StatsContextProvider>
                                        </DataContextProvider>
                                    </ExportContextProvider>
                                </ModificationsContextProvider>
                            </TuneSelectionContextProvider>
                        </ControlStateContextProvider>
                    </ModalsProvider>
                    </ActiveVariantContextProvider>
                </AudioContextProvider>
            </AuthContextProvider>
        </ToastContextProvider>
    )
}

export default ContextProviders

