import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const BotInfoScreen = (props) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>BotInfoScreen</Text>
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Bot #1',
};

const styles = StyleSheet.create({});

export default BotInfoScreen;
