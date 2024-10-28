import React, {useState} from 'react';
import {View} from 'react-native';
import {FAB, Portal, Provider} from 'react-native-paper';
import {EventModal} from '../EventModal/EventModal';
import {styles} from "./styles";
import {RootState} from "../../redux/store";
import {useSelector} from "react-redux";

export default function NewEventButton() {
    const [modalVisible, setModalVisible] = useState(false);
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <View>
            {/* Main content */}
            <EventModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <Provider>
                {/* FAB placed inside Portal to overlay on top */}
                <Portal>
                    <FAB
                        style={styles(mode).fab}
                        icon="plus-thick"
                        color="white"
                        onPress={() => setModalVisible(true)}
                    />
                </Portal>
            </Provider>
        </View>
    );
}