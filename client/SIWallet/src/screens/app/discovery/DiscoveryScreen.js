import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import LoadingScreen from '../../../components/LoadingScreen';
import ErrorScreen from '../../../components/ErrorScreen';
import ContentList from '../../../components/ContentList';
import {useDispatch, useSelector} from 'react-redux';
import * as NewsAPI from '../../../API/NewsAPI';
import newsData from '../../../data/dummy-news-data';

const DiscoveryScreen = (props) => {
  let {userId, token} = useSelector((state) => state.auth);
  const [contentCards, setContentCards] = useState();
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(undefined);
  const dispatch = useDispatch();
  let CardsContent = View;

  const getNews = useCallback(
    async (token) => {
      console.log('GET NEWS\n\n');
      setNewsLoading(true);
      setLoadingError(undefined);
      try {
        let result = await NewsAPI.getNews(token);
        if (result.statusCode === 200) {
          console.log(result);

          setNews(result.data);
          setContentCards(result.data);
          console.log(result.data);
        } else {
          console.log(result);
          const errorId = result.data.errors?.[0];
          let message = Global.getErrorMessage(
            errorId,
            'DiscoveryScreen/getNews',
            false,
          );
          throw new Error(message);
        }
      } catch (err) {
        setLoadingError(err.message);
        console.log('loading news ->> ' + err.message);
      }
      setNewsLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    //getNews(token);
    //console.log(newsData)
    setNews(newsData);
    setContentCards(newsData);
    console.log('LATEST');
    //console.log(contentCards.latest);
  }, []);

  // if (!userId && !token) {
  //   CardsContent = ErrorScreen;
  // } else {
  //
  //   if (loadingError) {
  //     CardsContent = ErrorScreen;
  //   } else if (newsLoading) {
  //     CardsContent = LoadingScreen;
  //   }
  // }
  CardsContent = ContentList;

  

  const renderEventItem = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          event={item.item}
          onPress={() => {
            props.navigation.navigate('DiscoveryNavigator', {
              screen: 'NewsInfo',
              params: {
                newsItem: item.item,
                title: item.item.title,
              },
            });
          }}
          style={{borderRadius: 12, marginRight: 16, marginBottom: 10}}>
          <Image
            source={{uri: item.item.originalImageUrl}}
            style={{width: 300, height: 175, borderRadius: 12}}
          />
        </TouchableOpacity>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {item.item.title}
        </Text>
      </View>
    );
  };

  if (loadingError) {
    return (
      <ErrorScreen
        isAction={true}
        errorText="An error occured while loading news, try again"
        onErrorPress={() => {
          getNews(token);
        }}
      />
    );
  } else if (newsLoading || !contentCards) {
    return <LoadingScreen />;
  } else {
    console.log('IMA HERE');
    console.log(newsData.latest);
    return (
      <View style={{flex: 1, backgroundColor: Colors.blackBackground}}>
        <CardsContent
          data={newsData.latest}
          listStyle={styles.flatList}
          isAction={true}
          errorText={'An error occured while getting news, try again'}
          onErrorPress={() => {
            //getNews(token);
            setNews(newsData);
            setContentCards(newsData);
          }}
          // header={() => (
          //   <View>
          //     <Text style={styles.listHeader}>Top Events</Text>
          //     <FlatList
          //       showsHorizontalScrollIndicator={false}
          //       style={styles.listStyle}
          //       data={contentCards?.top}
          //       keyExtractor={(item) => item._id}
          //       renderItem={renderEventItem}
          //       horizontal={true}
          //     />
          //     <Text style={{...styles.listHeader}}>News</Text>
          //   </View>
          // )}
        />
      </View>
    );
  }
};

export const screenOptions = {
  headerTitle: 'Discovery',
};

const styles = StyleSheet.create({
  listHeader: {
    color: Colors.listHeaderTitle,
    fontSize: 25,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 19,
  },
  eventTitle: {
    color: Colors.adressGray,
    fontSize: 16,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    width: 270,
    marginLeft: 5,
  },
  listStyle: {
    paddingHorizontal: 19,
  },
});

export default DiscoveryScreen;
