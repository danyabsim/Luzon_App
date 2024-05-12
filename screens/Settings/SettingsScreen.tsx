import React from 'react';
import { Alert, Modal, Text, View, TouchableOpacity } from 'react-native';
import {styles} from "./styles";

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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={styles.textStyle}>Click Me!</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}