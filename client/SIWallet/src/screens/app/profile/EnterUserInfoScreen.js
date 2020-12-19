import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import DefaultTextInput from '../../../components/profileScreen/DefaultTextInput';
import ButtonComponent from '../../../components/ButtonComponent';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';

import {useDispatch, useSelector} from 'react-redux';

const EnterUserInfoScreen = (props) => {
  const [name, setName] = useState(props.route.params.name);
  const [surname, setSurname] = useState(props.route.params.surname);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState();
  const {authType, userId, token} = props.route.params;
  const dispatch = useDispatch();

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
          <ButtonComponent
            title={'Save'}
            onPress={() => {
              //signInHandler(login, password);
              props.navigation.goBack();
            }}
            buttonContainerStyle={{padding: 0}}
          />
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
