import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const MarketScreen = (props) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>MarketScreen</Text>
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Market',
};

const styles = StyleSheet.create({});

export default MarketScreen;
