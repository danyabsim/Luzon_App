import {styleByTime} from "../../constants/AppStyles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Image, TouchableOpacity} from "react-native";
import {setEvents} from "../../redux/Events/eventsSlice";
import {XHR} from "../../utils/XHR";
import styles from "./styles";

export function RefreshImage() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={() => {
            dispatch(setEvents({}));
            XHR(dispatch, '/connect', {...user});
        }}>
            <Image
                style={styles.headerButtonImage}
                source={styleByTime(require('../../assets/refresh (black).png'), require('../../assets/refresh (white).png'), mode)}
            />
        </TouchableOpacity>
    );
}