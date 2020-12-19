import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CreateBotScreen = (props) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>CreateBotScreen</Text>
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'New Bot',
};

const styles = StyleSheet.create({});

export default CreateBotScreen;
