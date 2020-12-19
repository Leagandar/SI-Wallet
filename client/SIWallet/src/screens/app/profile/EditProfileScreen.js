import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import InfoCard from '../../../components/profileScreen/InfoCard';
import UserPreviewCard from '../../../components/profileScreen/UserPreviewCard';
import InfoChecksCard from '../../../components/profileScreen/InfoChecksCard';
import DoneButton from '../../../components/profileScreen/DoneButton';

const EditProfileScreen = (props) => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.blackBackground}}>
      <UserPreviewCard
        userName="Graham Stephan"
        userBalance={'8.210,00'}
        cardStyle={{marginTop: 20, marginBottom: 24}}
        isButtonsEnabled={false}
      />
      <InfoCard
        contentList={[
          {
            title: 'First name',
            value: 'Graham',
          },
          {
            title: 'Last name',
            value: 'Stephan',
          },
          {
            title: 'Email',
            value: 'gram.stephan@gmail.com',
          },
          {
            title: 'Phone',
            value: '+14845101972',
          },
        ]}
        title="Account Info"
        cardStyle={{marginBottom: 24, height: 194}}
        isEditEnabled={true}
        onEditPress={() => {
          props.navigation.navigate('EnterUserInfo', {
            name: 'Graham',
            surname: 'Stephan',
          });
        }}
      />
      <InfoChecksCard
        contentList={[
          {
            title: 'Notifications',
            value: true,
          },
          {
            title: 'Auto-reneval',
            value: false,
          },
          {
            title: 'Bots-status',
            value: true,
            valueStyle: {color: Colors.greenMain},
          },
        ]}
        title="Settings"
        cardStyle={{marginBottom: 24, height: 160}}
      />
      <DoneButton
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </ScrollView>
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

export default EditProfileScreen;
