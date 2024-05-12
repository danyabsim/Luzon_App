import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from "./styles";
import {ModalApp} from "../../components/ModalApp/ModalApp";
import {ChangePasswordModal} from "../../components/ChangePasswordModal/ChangePasswordModal";
import {AddUserModal} from "../../components/AddUserModal/AddUserModal";
import {RemoveUserModal} from "../../components/RemoveUserModal/RemoveUserModal";
import {DarkModeModal} from "../../components/DarkModeModal/DarkModeModal";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export default function Settings() {
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [whoIsOn, setWhoIsOn] = React.useState('');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.settingItem} onPress={() => {
                setWhoIsOn('Change Password');
                setModalVisible(true);
            }}>
                <Text style={styles.settingText}>Change Password</Text>
            </TouchableOpacity>
            {isAdmin && (
                <>
                    <TouchableOpacity style={styles.settingItem} onPress={() => {
                        setWhoIsOn('Add User');
                        setModalVisible(true);
                    }}>
                        <Text style={styles.settingText}>Add User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem} onPress={() => {
                        setWhoIsOn('Remove User');
                        setModalVisible(true);
                    }}>
                        <Text style={styles.settingText}>Remove User</Text>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity style={styles.settingItem} onPress={() => {
                setWhoIsOn('Dark Mode');
                setModalVisible(true);
            }}>
                <Text style={styles.settingText}>Dark Mode</Text>
            </TouchableOpacity>
            <ModalApp modalVisible={modalVisible} setModalVisible={setModalVisible} children={
                <View>
                    {whoIsOn === 'Change Password' && <ChangePasswordModal/>}
                    {whoIsOn === 'Add User' && <AddUserModal/>}
                    {whoIsOn === 'Remove User' && <RemoveUserModal/>}
                    {whoIsOn === 'Dark Mode' && <DarkModeModal/>}
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                </View>
            }/>
        </View>
    );
}