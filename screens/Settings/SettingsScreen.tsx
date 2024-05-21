import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from "./styles";
import {ModalApp} from "../../components/ModalApp/ModalApp";
import {ChangePasswordModal} from "../../components/Settings/ChangePasswordModal/ChangePasswordModal";
import {AddUserModal} from "../../components/Settings/AddUserModal/AddUserModal";
import {RemoveUserModal} from "../../components/Settings/RemoveUserModal/RemoveUserModal";
import {ChangeThemeModal} from "../../components/Settings/ChangeThemeModal/ChangeThemeModal";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export default function Settings() {
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [whoIsOn, setWhoIsOn] = React.useState('');
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <View style={styles(mode).container}>
            <TouchableOpacity style={styles(mode).settingItem} onPress={() => {
                setWhoIsOn('Change Password');
                setModalVisible(true);
            }}>
                <Text style={styles(mode).settingText}>Change Password</Text>
            </TouchableOpacity>
            {isAdmin && (
                <>
                    <TouchableOpacity style={styles(mode).settingItem} onPress={() => {
                        setWhoIsOn('Add User');
                        setModalVisible(true);
                    }}>
                        <Text style={styles(mode).settingText}>Add User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles(mode).settingItem} onPress={() => {
                        setWhoIsOn('Remove User');
                        setModalVisible(true);
                    }}>
                        <Text style={styles(mode).settingText}>Remove User</Text>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity style={styles(mode).settingItem} onPress={() => {
                setWhoIsOn('Dark Mode');
                setModalVisible(true);
            }}>
                <Text style={styles(mode).settingText}>Change Theme</Text>
            </TouchableOpacity>
            <ModalApp modalVisible={modalVisible} setModalVisible={setModalVisible} children={
                <View>
                    {whoIsOn === 'Change Password' && <ChangePasswordModal onClose={() => setModalVisible(false)}/>}
                    {whoIsOn === 'Add User' && <AddUserModal onClose={() => setModalVisible(false)}/>}
                    {whoIsOn === 'Remove User' && <RemoveUserModal onClose={() => setModalVisible(false)}/>}
                    {whoIsOn === 'Dark Mode' && <ChangeThemeModal onClose={() => setModalVisible(false)}/>}
                </View>
            }/>
        </View>
    );
}