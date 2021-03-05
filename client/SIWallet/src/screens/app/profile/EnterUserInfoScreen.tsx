import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DefaultTextInput from '../../../components/profileScreen/DefaultTextInput';
import ButtonComponent from '../../../components/ButtonComponent';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import * as UserAPI from '../../../API/UserAPI';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../../../store/actions/auth';

import {EditUserInfoScreenProps} from './types/routing';

const EnterUserInfoScreen: React.FC<EditUserInfoScreenProps> = (props) => {
  const {name: propsName, surname: propsSurname} = props.route.params;
  const [name, setName] = useState(propsName);
  const [surname, setSurname] = useState(propsSurname);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState();
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const editUserInfo = async (token: string, name: string, surname: string) => {
    let result;
    setLoadingError(undefined);
    setIsLoading(true);
    try {
      result = await UserAPI.editUserInfo(token, name, surname);
      if (result.statusCode === 200) {
        dispatch(authActions.setUserInfo(result.data));
        props.navigation.goBack();
      } else {
        Global.errorHandler(result);
      }
    } catch (err) {
      Alert.alert('Manage profile', "Can't edit user info", [{text: 'OK'}]);
      setLoadingError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.blackBackground}}>
      <TouchableWithoutFeedback
        style={{
          flex: 1,
        }}
        onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1, marginTop: 25, paddingHorizontal: 17}}>
          <DefaultTextInput
            containerTitle={'Name'}
            onChangeText={(text) => {
              setName(text);
            }}
            value={name}
            placeholderTextColor={Colors.placeholder}
            placeholder="Enter name"
            autoCapitalize={'none'}
            inputStyle={{margingBottom: 10}}
          />
          <DefaultTextInput
            containerTitle={'Surname'}
            onChangeText={(text) => {
              setSurname(text);
            }}
            value={surname}
            placeholder="Enter surname"
            placeholderTextColor={Colors.placeholder}
            autoCapitalize={'none'}
          />
          {isLoading ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.greenMain} />
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <ButtonComponent
                title={'Save'}
                onPress={() => {
                  editUserInfo(token, name, surname);
                }}
                buttonContainerStyle={{padding: 0}}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const screenOptions = (navData: EditUserInfoScreenProps) => {
  return {
    headerTitle: 'Manage Profile',
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.goBack();
        }}>
        <Image
          source={require('../../../assets/images/backIcon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 28,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
  backIcon: {
    height: 24,
    width: 24,
    marginLeft: 14,
  },
});

export default EnterUserInfoScreen;
