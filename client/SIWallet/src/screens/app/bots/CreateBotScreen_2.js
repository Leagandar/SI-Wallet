import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import data, {detailsList, iconsByType} from '../../../data/botRateCards';
const {windowWidth, windowHeight} = Dimensions.get('window');

const TITLE_SIZE = 36;
const SPACING = 80;
const IMAGE_SIZE = windowWidth * 0.8;

const colors = {
  lightBg: '#F2F2F2',
  darkBg: '#2C2D51',
  lightText: '#E5E5DD',
  darkText: '#A5A6AA',
};

const Item = ({children, style}) => {
  return <View style={[itemStyle, style]}>{children}</View>;
};

const Icon = ({type}) => {
  return (
    <Image
      source={require(`../../../assets/images/${type}`)}
      style={iconStyle}
    />
  );
};

const Description = ({index, text, color}) => {
  return (
    <Item>
      <Text key={`description-${index}`} style={{fontSize: 16, color}}>
        {text}
      </Text>
    </Item>
  );
};

const Title = ({index, text, color}) => {
  return (
    <Item style={titleContainerStyle}>
      <Text
        key={`title-${index}`}
        style={{fontSize: TITLE_SIZE, color, fontWeight: '900'}}>
        {text}
      </Text>
    </Item>
  );
};

const Details = ({color, index}) => {
  return (
    <View style={{marginVertical: SPACING}}>
      {detailsList.map((key) => {
        return (
          <View key={key} style={detailsRowStyle}>
            <Icon type={iconsByType[key]} />
            <Item style={{flex: 1, height: 26, justifyContent: 'center'}}>
              <Text key={`${key}-${index}`} style={detailsRowTextStyle}>
                {data[index][key]}
              </Text>
            </Item>
          </View>
        );
      })}
    </View>
  );
};

const CreateBotScreen_2 = (props) => {
  const [activeRate, setActiveRate] = useState('MiniBot');
  const [index, setIndex] = useState(0);
  const color = index % 2 === 1 ? colors.lightText : colors.darkText;
  const headingColor = index % 2 === 1 ? colors.lightText : colors.darkBg;

  return (
    <SafeAreaView style={[styles.container]}>
      <View
        style={[
          styles.imageContainer,
          {borderColor: index % 2 === 0 ? colors.darkBg : colors.lightBg},
        ]}>
        <Image
          source={require('../../../assets/images/1.jpg')}
          style={styles.image}
        />
      </View>
      <View style={{padding: 20, flex: 1, justifyContent: 'space-evenly'}}>
        <Title color={headingColor} index={index} text={data[index].title} />
        <Details color={color} index={index} />
        <Description
          index={index}
          text={data[index].description}
          color={headingColor}
        />
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'New Bot',
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

const styles = StyleSheet.create({
  switch: {
    transform: [{scaleX: 1.8}, {scaleY: 1.6}],
    marginBottom: 10,
    marginRight: 14,
    marginTop: 9,
  },
  flagTitle: {
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
    paddingBottom: 10,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
    paddingVertical: 25,
  },
  flatList: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 17,
  },
  itemStyle: {
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  iconStyle: {
    marginRight: 15,
    height: 26,
    width: 26,
  },
  titleContainerStyle: {
    height: TITLE_SIZE * 3,
    justifyContent: 'flex-end',
  },
  detailsRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  detailsRowTextStyle: {
    fontSize: 16,
    color,
    fontWeight: '700',
  },
});

export default CreateBotScreen_2;
