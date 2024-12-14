import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {localScoreList, remoteScoreList} from '../../store/action';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import styles from './styles';
import {BlurView} from '@react-native-community/blur';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';

type ScoreScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Score'
>;

interface ScoreItem {
  country: string;
  score: number;
  averageScore: number;
  [key: string]: any;
}

interface ScoreModel {
  data: ScoreItem[];
  loading: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
}

const mapStateToProps = (state: {score: ScoreModel}) => ({
  scoreModel: state.score,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ScoreScreenProps = PropsFromRedux & {
  navigation: ScoreScreenNavigationProp;
};

const ScoreScreen: React.FC<ScoreScreenProps> = ({
  scoreModel,
  dispatch,
  navigation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('remote');
  const [filteredData, setFilteredData] = useState<ScoreItem[]>(
    scoreModel.data,
  );

  const requestAPI = useCallback(() => {
    dispatch(
      remoteScoreList({
        page: 1,
      }),
    );
  }, [dispatch]);

  const requestLocal = useCallback(() => {
    dispatch(localScoreList());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTab === 'local') {
      requestLocal();
    }
  }, [requestLocal, selectedTab]);

  useEffect(() => {
    if (selectedTab === 'remote') {
      requestAPI();
    }
  }, [requestAPI, selectedTab]);

  useEffect(() => {
    if (searchQuery === '') {
      const data = scoreModel.data.map(item => {
        if (item.country.trim() !== '') {
          const countryData = scoreModel.data.filter(
            (scoreData: {country: string; score: number}) =>
              scoreData.country.toLowerCase() === item.country.toLowerCase(),
          );
          const totalScore = countryData.reduce(
            (sum, scoreData) => sum + scoreData.score,
            0,
          );
          const average =
            countryData.length > 0 ? totalScore / countryData.length : 0;
          return {
            ...item,
            averageScore: average,
          };
        } else {
          return {
            ...item,
            averageScore: 0,
          };
        }
      });
      setFilteredData(data);
    } else {
      const filtered = scoreModel.data.filter(item => {
        const matchesSearch = item.country
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesSearch;
      });
      const data = filtered.map(item => {
        if (item.country.trim() !== '') {
          const countryData = scoreModel.data.filter(
            (scoreData: {country: string; score: number}) =>
              scoreData.country.toLowerCase() === item.country.toLowerCase(),
          );
          const totalScore = countryData.reduce(
            (sum, scoreData) => sum + scoreData.score,
            0,
          );
          const average =
            countryData.length > 0 ? totalScore / countryData.length : 0;
          return {
            ...item,
            averageScore: average,
          };
        } else {
          return {
            ...item,
            averageScore: 0,
          };
        }
      });
      setFilteredData(data);
    }
  }, [searchQuery, selectedTab, scoreModel.data]);

  const renderHeader = () => <Text style={styles.title}>Score Board</Text>;

  const renderFooter = () => (
    <View style={styles.footerText}>
      {scoreModel.moreLoading && <ActivityIndicator />}
      {scoreModel.isListEnd && <Text>No more scores at the moment</Text>}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
    </View>
  );

  const renderItem = ({item}: {item: ScoreItem}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          return navigation.navigate('Details', {
            country: item?.country || '',
            score: item?.score,
            averageScore: item?.averageScore,
          });
        }}>
        <ScoreCard score={item} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {scoreModel.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.list}
            data={filteredData}
            renderItem={({item}) => renderItem({item})}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
          <View
            style={[
              styles.bottomTab,
              selectedTab === 'local' && styles.activeTabOffline,
              selectedTab === 'remote' && styles.activeTabOnline,
            ]}>
            <BlurView
              style={StyleSheet.absoluteFillObject}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButtonContainer,
                  selectedTab === 'remote' && styles.activeTab,
                ]}
                onPress={() => setSelectedTab('remote')}>
                <View style={[styles.tabButton]}>
                  <Text style={styles.tabText}>Online</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButtonContainer,
                  selectedTab === 'local' && styles.activeTab,
                ]}
                onPress={() => setSelectedTab('local')}>
                <View style={[styles.tabButton]}>
                  <Text style={styles.tabText}>Offline</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by country"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default connector(ScoreScreen);
