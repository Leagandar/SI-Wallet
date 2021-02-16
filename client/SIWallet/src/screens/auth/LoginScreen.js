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
import KeyboardAvoidingComponent from '../../components/KeyboardAvoidingComponent';
import AnimatedTextInput from '../../components/profileScreen/AnimatedTextInput';
import ButtonComponent from '../../components/ButtonComponent';
import {CommonActions} from '@react-navigation/native';

export const Header = (props) => {
  return (
    <View style={styles.headerContainer}>
      <Logo />
      <Text style={styles.titleText}>SIWallet</Text>
    </View>
  );
};

export const Logo = (props) => {
  return (
    <Image
      source={require('../../assets/images/SIWalletIcon.png')}
      style={styles.walletIcon}
    />
  );
};

const InputFields = (props) => {
  return (
    <View>
      <AnimatedTextInput
        onChangeText={(text) => {
          props.setLogin(text);
        }}
        value={props.login}
        label="Username"
        inputStyle={{zIndex: 4}}
      />
      <AnimatedTextInput
        onChangeText={(text) => {
          props.setPassword(text);
        }}
        value={props.password}
        label="Password"
        secureTextEntry={true}
      />
    </View>
  );
};

const CheckBox = (props) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => {
          props.setCheckActive(!props.enabled);
        }}>
        {props.enabled && (
          <Image
            source={require('../../assets/images/blueCheckIcon.png')}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.rememberMeText}>Remember me</Text>
    </View>
  );
};

const ResetPasswordComponent = (props) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Text style={styles.forgotText}>Forgot password?</Text>
    </TouchableOpacity>
  );
};

const ButtonsContainer = (props) => {
  return (
    <View>
      {props.isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={Colors.greenMain} />
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <ButtonComponent
            title="SIGN IN"
            onPress={() => {
              props.signInHandler(props.login, props.password);
            }}
            buttonContainerStyle={styles.buttonContainer}
          />
          <ButtonComponent
            title="SIGN UP"
            onPress={() => {
              props.navigation.navigate('SignUp');
            }}
            buttonContainerStyle={styles.buttonContainer}
            buttonStyle={{backgroundColor: Colors.grayBackground}}
          />
        </View>
      )}
    </View>
  );
};

const TouchableImage = (props) => {
  return (
    <TouchableOpacity>
      <Image source={props.source} style={styles.socialMediaIcon} />
    </TouchableOpacity>
  );
};

const SocialMediaAuthContainer = (props) => {
  return (
    <View style={styles.socialMediaContainer}>
      <TouchableImage source={require('../../assets/images/fbIcon.png')} />
      <TouchableImage source={require('../../assets/images/twitterIcon.png')} />
      <TouchableImage source={require('../../assets/images/instIcon.png')} />
      <TouchableImage source={require('../../assets/images/googleIcon.png')} />
    </View>
  );
};

const LoginScreen = (props) => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [isCheckActive, setCheckActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
  };

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
    <KeyboardAvoidingComponent>
      <View style={styles.screen}>
        <Header />
        <View style={{flex: 1}}></View>
        <View style={{paddingHorizontal: 17, marginBottom: 20}}>
          <InputFields
            login={login}
            password={password}
            setLogin={setLogin}
            setPassword={setPassword}
          />
          <View style={styles.checkBoxInfoContainer}>
            <CheckBox enabled={isCheckActive} setCheckActive={setCheckActive} />
            <ResetPasswordComponent />
          </View>
          <ButtonsContainer
            isLoading={isLoading}
            signInHandler={signInHandler}
            navigation={props.navigation}
            login={login}
            password={password}
          />
          <Text style={styles.orLoginText}>Or login with</Text>
          <SocialMediaAuthContainer />
        </View>
      </View>
    </KeyboardAvoidingComponent>
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
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
  },
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
    justifyContent: 'space-between',
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
  buttonContainer: {
    padding: 0,
    width: 155,
  },
});

export default LoginScreen;
