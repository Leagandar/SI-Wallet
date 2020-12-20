import React, {useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Button,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';

const NewsInfoScreen = (props) => {
  const newsItem = props.route.params.newsItem;

  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.titleText}>{newsItem.title}</Text>
      <Text style={styles.dateText}>
        {new Date(newsItem.publishedAt).toDateString()}
      </Text>
      <Image
        source={{uri: newsItem.originalImageUrl}}
        style={styles.previewImage}
      />
      <Text style={styles.descriptionText}>{newsItem.description}</Text>
      <OpenURLButton url={newsItem.url}>Read more...</OpenURLButton>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Discovery',
    headerTitleStyle: {
      fontSize: 28,
      fontFamily: Global.fonts.BALSAMIQ_BOLD,
      color: Colors.whiteTitle,
      marginRight: 20,
      marginBottom: 6
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
  previewImage: {
    height: 175,
    borderRadius: 12,
    marginBottom: 16,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.descriptionText,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 22,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
  },
  button: {
    height: 57,
    flex: 1,
    borderRadius: 12,
    backgroundColor: Colors.greenMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: '#B2B5BA',
    marginBottom: 8,
  },
});

export default NewsInfoScreen;
