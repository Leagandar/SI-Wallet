import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as AuthAPI from '../../API/AuthAPI';
import DefaultTextInput from '../../components/profileScreen/DefaultTextInput';
import AnimatedTextInput from '../../components/profileScreen/AnimatedTextInput';
import ButtonComponent from '../../components/ButtonComponent';
import {CommonActions} from '@react-navigation/native';

const LoginScreen = (props) => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [isCheckActive, setCheckActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState();
  const dispatch = useDispatch();

  const signInHandler = async (email, password) => {
    setLoginError(null);
    setIsLoading(true);
    try {
      Keyboard.dismiss();
      let result = await AuthAPI.login(email, password);
      if (result.statusCode === 200) {
        await dispatch(
          authActions.login(result.data.id, result.data.access_token),
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
          'SignInScreen/login',
          false,
        );
        throw new Error(message);
      }
    } catch (err) {
      setLoginError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (loginError) {
      Alert.alert('Somethin went wrong', loginError, [{text: 'OK'}]);
    }
  }, [loginError]);

  return (
    <TouchableWithoutFeedback
      style={{
        flex: 1,
      }}
      onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1, backgroundColor: Colors.blackBackground}}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/images/SIWalletIcon.png')}
            style={styles.walletIcon}
          />
          <Text style={styles.titleText}>SIWallet</Text>
        </View>
        <View style={{flex: 1}}></View>
        <View style={{paddingHorizontal: 17, marginBottom: 20}}>
          <AnimatedTextInput
            onChangeText={(text) => {
              setLogin(text);
            }}
            value={login}
            label="Username"
            inputStyle={{zIndex: 4}}
          />
          <AnimatedTextInput
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
            label="Password"
            secureTextEntry={true}
          />
          {/* <View style={styles.checkBoxInfoContainer}>
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
            <Text style={styles.rememberMeText}>Remember me</Text>
            <View style={{flex: 1}}></View>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View> */}
          {isLoading ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.greenMain} />
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <ButtonComponent
                title={'SIGN IN'}
                onPress={() => {
                  signInHandler(login, password);
                }}
                buttonContainerStyle={{padding: 0, width: 155}}
              />
              <ButtonComponent
                title={'SIGN UP'}
                onPress={() => {
                  props.navigation.navigate('SignUp');
                  //signInHandler(login, password);
                }}
                buttonContainerStyle={{padding: 0, width: 155}}
                buttonStyle={{
                  backgroundColor: Colors.grayBackground,
                }}
              />
            </View>
          )}

          <Text style={styles.orLoginText}>Or login with</Text>
          <View style={styles.socialMediaContainer}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/fbIcon.png')}
                style={styles.socialMediaIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/twitterIcon.png')}
                style={styles.socialMediaIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/instIcon.png')}
                style={styles.socialMediaIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/googleIcon.png')}
                style={styles.socialMediaIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: '',
    // headerTitleStyle: {
    //   fontSize: 28,
    //   fontFamily: Global.fonts.BALSAMIQ_BOLD,
    //   color: Colors.whiteTitle,
    // },
    // headerTitleAlign: 'center',
  };
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
    marginTop: 58,
    marginBottom: 41,
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
  rememberMeText: {
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.white,
  },
  forgotText: {
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.blue,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 47,
  },
  orLoginText: {
    fontSize: 22,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.whiteTitle,
    alignSelf: 'center',
    marginBottom: 38,
  },
  socialMediaIcon: {
    width: 63,
    height: 58,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityIndicator: {
    height: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
