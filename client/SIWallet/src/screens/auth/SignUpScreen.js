import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as AuthAPI from '../../API/AuthAPI';
import DefaultTextInput from '../../components/profileScreen/DefaultTextInput';
import ButtonComponent from '../../components/ButtonComponent';
import {CommonActions} from '@react-navigation/native';

const SignUpScreen = (props) => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [repeatedPassword, setRepeatedPassword] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [isCheckActive, setCheckActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState();
  const dispatch = useDispatch();

  const signUpHandler = async (email, password, login, name, surname) => {
    if (password === repeatedPassword) {
      setRegistrationError(undefined);
      setIsLoading(true);
      try {
        Keyboard.dismiss();
        let result = await AuthAPI.signup(
          email,
          password,
          login,
          name,
          surname,
        );
        if (result.statusCode === 200) {
          await dispatch(
            authActions.signup(result.data.id, result.data.access_token),
          );
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'TabNavigator'}],
            }),
          );
        } else {
          console.log(result);
          const errorId = result.data.message?.[0];
          let message = Global.getErrorMessage(
            errorId,
            'SignUpScreen/signup',
            false,
          );
          throw new Error(message);
        }
      } catch (err) {
        setRegistrationError(err.message);
      }
      setIsLoading(false);
    } else {
      Alert.alert('Error occured', 'Passwords do not match', [{text: 'OK'}]);
    }
  };

  useEffect(() => {
    if (registrationError) {
      Alert.alert('Error occured', registrationError, [{text: 'OK'}]);
    }
  }, [registrationError]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.blackBackground,
      }}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/images/SIWalletIcon.png')}
          style={styles.walletIcon}
        />
        <Text style={styles.titleText}>SIWallet</Text>
      </View>
      <View style={{flex: 1}}></View>
      <View style={{paddingHorizontal: 17, marginBottom: 20}}>
        <DefaultTextInput
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
          placeholder="NAME"
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={'none'}
        />
        <DefaultTextInput
          onChangeText={(text) => {
            setSurname(text);
          }}
          value={surname}
          placeholder="SURNAME"
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={'none'}
        />
        <DefaultTextInput
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          placeholder="EMAIL"
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={'none'}
        />
        <DefaultTextInput
          onChangeText={(text) => {
            setLogin(text);
          }}
          value={login}
          placeholder="USERNAME"
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={'none'}
        />
        <DefaultTextInput
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          placeholder="PASSWORD"
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />
        <DefaultTextInput
          onChangeText={(text) => {
            setRepeatedPassword(text);
          }}
          value={repeatedPassword}
          placeholder="CONFIRM PASSWORD"
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />

        <View style={styles.checkBoxInfoContainer}>
          <TouchableOpacity
            style={styles.checkBox}
            onPress={() => {
              setCheckActive(!isCheckActive);
            }}>
            {isCheckActive && (
              <Image
                source={require('../../assets/images/blueCheckIcon.png')}
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.rememberMeText}>I have read and agree</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgotText}> Terms of Service</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color={Colors.greenMain} />
          </View>
        ) : (
          <ButtonComponent
            title={'SIGN UP'}
            onPress={() => {
              signUpHandler(email, password, login, name, surname);
            }}
            buttonContainerStyle={{padding: 0}}
          />
        )}
      </View>
    </ScrollView>
  );
};

export const screenOptions = {
  headerTitle: '',
};

const styles = StyleSheet.create({
  walletIcon: {
    width: 87,
    height: 81,
    marginBottom: 11,
    marginLeft: 6,
  },
  titleText: {
    fontSize: 24,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 11,
  },
  checkIcon: {
    width: 12,
    height: 8,
  },
  checkBox: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.outlineStroke,
    backgroundColor: Colors.blackBackground,
    height: 26,
    width: 26,
    marginRight: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxInfoContainer: {
    flexDirection: 'row',
    marginTop: 17,
    paddingHorizontal: 2,
    marginBottom: 27,
  },
  forgotText: {
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.blue,
  },
  rememberMeText: {
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.grayBlueText,
  },
  activityIndicator: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpScreen;
