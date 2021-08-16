import React, {ReactElement} from 'react';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from "react-native";
import { useSelector } from 'react-redux';
import { AppRootState } from './states/AppStore';

const AppOverlay: React.FC<{ children? : ReactElement }> = (props) => {
    const shouldShowLoading = useSelector((state: AppRootState) => state.ui.loading)

    return (
        <>
            <Overlay isVisible={shouldShowLoading}>
                <ActivityIndicator size="large" color="#0000ff" />
            </Overlay>
            {props.children}
        </>
    )
}

export default AppOverlay