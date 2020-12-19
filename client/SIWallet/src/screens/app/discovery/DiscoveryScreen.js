import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const DiscoveryScreen = (props) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>DiscoveryScreen</Text>
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Discovery',
};

const styles = StyleSheet.create({});

export default DiscoveryScreen;
