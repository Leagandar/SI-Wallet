import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Colors from '../constants/Colors';
import * as Global from '../Global';

const ContentList = (props) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={props.listStyle}
      data={props.data}
      keyExtractor={(item) => item.id}
      renderItem={props.renderItem}
      ListHeaderComponent={props.header}
    />
  );
};

const styles = StyleSheet.create({
  footerText: {
    color: Colors.listHeaderTitle,
    fontSize: 16,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
  },
});

export default ContentList;
