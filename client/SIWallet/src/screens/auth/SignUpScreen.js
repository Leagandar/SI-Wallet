import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';
import {useDispatch, useSelector} from 'react-redux';
import DefaultTextInput from '../../components/profileScreen/DefaultTextInput';
import ButtonComponent from '../../components/ButtonComponent';

const SignUpScreen = (props) => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [repeatedPassword, setRepeatedPassword] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [isCheckActive, setCheckActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState();
  const dispatch = useDispatch();

  const signUpHandler = async (email, password) => {
    if (password === repeatedPassword) {
      setRegistrationError(undefined);
      setIsLoading(true);
      try {
        let result = await AuthAPI.signup(email, password);
        if (result.statusCode === 200) {
          await dispatch(
            authActions.signup(result.data.user, result.data.token),
          );
          Keyboard.dismiss();
        } else {
          console.log(result);
          const errorId = result.data.errors?.[0];
          let message = Constants.getErrorMessage(
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
      <View style={{paddingHorizontal: 17}}>
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
        />
        <DefaultTextInput
          onChangeText={(text) => {
            setRepeatedPassword(text);
          }}
          value={repeatedPassword}
          placeholder="CONFIRM PASSWORD"
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={'none'}
        />
        <DefaultTextInput
          onChangeText={(text) => {
            setPhone(text);
          }}
          value={phone}
          placeholder="PHONE"
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={'none'}
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
        <ButtonComponent
          title={'SIGN UP'}
          onPress={() => {
            //signInHandler(login, password);
          }}
          buttonContainerStyle={{padding: 0}}
        />
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
    marginBottom: 31,
    marginLeft: 6,
  },
  titleText: {
    fontSize: 24,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 58,
    marginBottom: 121,
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
});

export default SignUpScreen;
