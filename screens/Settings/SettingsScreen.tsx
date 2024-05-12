import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from "./styles";
import {ModalApp} from "../../components/ModalApp/ModalApp";

export default function Settings() {
    const isAdmin = true;
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.settingItem} onPress={() => setModalVisible(true)}>
                <Text style={styles.settingText}>Change Password</Text>
            </TouchableOpacity>
            {isAdmin && (
                <>
                    <TouchableOpacity style={styles.settingItem} onPress={() => setModalVisible(true)}>
                        <Text style={styles.settingText}>Add User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem} onPress={() => setModalVisible(true)}>
                        <Text style={styles.settingText}>Remove User</Text>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity style={styles.settingItem} onPress={() => setModalVisible(true)}>
                <Text style={styles.settingText}>Dark Mode</Text>
            </TouchableOpacity>
            <ModalApp modalVisible={modalVisible} setModalVisible={setModalVisible} children={
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={styles.textStyle}>Click Me!</Text>
                    </TouchableOpacity>
                </View>
            }/>
        </View>
    );
}