import React from "react";
import {AudioContextProvider} from "./hooks/useAudioContext.tsx";
import {NotificationContextProvider} from "./hooks/useNotifications.tsx";
import {ModificationsContextProvider} from "./hooks/useModifications.tsx";
import {AuthContextProvider} from "./hooks/useAuth.tsx";
import {DataContextProvider} from "./hooks/useDataContext.tsx";
import {ModalsProvider} from "@mantine/modals";
import {RecordingSelectionContextProvider} from "./hooks/useRecordingSelection.tsx";

interface Properties {
    children: React.ReactNode;
}

const ContextProviders: React.FC<Properties> = ({children}) => {


    return (
        <ModalsProvider>
            <NotificationContextProvider>
                <AuthContextProvider>
                    <AudioContextProvider>
                        <RecordingSelectionContextProvider>
                            <ModificationsContextProvider>
                                <DataContextProvider>
                                    {children}
                                </DataContextProvider>
                            </ModificationsContextProvider>
                        </RecordingSelectionContextProvider>
                    </AudioContextProvider>
                </AuthContextProvider>
            </NotificationContextProvider>
        </ModalsProvider>
    )
}

export default ContextProviders

