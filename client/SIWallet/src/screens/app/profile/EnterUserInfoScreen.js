import React, {useState, useEffect} from 'react';
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

const EnterUserInfoScreen = (props) => {
  const [name, setName] = useState(props.route.params.name);
  const [surname, setSurname] = useState(props.route.params.surname);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState();
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const editUserInfo = async (token, name, surname) => {
    let result;

    setLoadingError(undefined);
    setIsLoading(true);
    try {
      result = await UserAPI.editUserInfo(token, name, surname);
      if (result.statusCode === 200) {
        dispatch(authActions.setUserInfo(result.data));
        props.navigation.goBack();
      } else {
        console.log(result);
        const errorId = result.data.errors?.[0];
        let message = Global.getErrorMessage(
          errorId,
          'SignUpSecondScreen/editUserInfo',
          false,
        );
        throw new Error(message);
      }
    } catch (err) {
      Alert.alert('Manage profile', "Can't edit user info", [{text: 'OK'}]);
      setLoadingError(err.message);
      console.log('error while editing user info -->' + err.message);
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

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Manage Profile',
    headerTitleStyle: {
      fontSize: 28,
      fontFamily: Global.fonts.BALSAMIQ_BOLD,
      color: Colors.whiteTitle,
    },
    headerTitleAlign: 'center',
    headerLeft: (props) => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.goBack();
        }}>
        <Image
          source={require('../../../assets/images/backIcon.png')}
          style={{height: 24, width: 24, marginLeft: 14}}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default EnterUserInfoScreen;
