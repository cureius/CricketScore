import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import styles from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

interface DetailsItem {
  country: string;
  score: number;
  averageScore?: number;
  [key: string]: any;
}

interface DetailsModel {
  data: DetailsItem[];
  loading: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
}

const mapStateToProps = (state: {score: DetailsModel}) => ({
  scoreModel: state.score,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type DetailsScreenProps = PropsFromRedux & {
  navigation: DetailsScreenNavigationProp;
  route: any;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({scoreModel, route}) => {
  const {country, score, averageScore} = route.params;
  const [filteredData, setFilteredData] = useState<DetailsItem[]>(
    scoreModel.data,
  );

  useEffect(() => {
    if (country === '') {
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
          .includes(country.toLowerCase());
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
  }, [country, scoreModel.data]);

  const renderHeader = () => (
    <>
      <DetailsCard
        country={country}
        score={score}
        averageScore={averageScore}
      />
      <Text style={styles.title}>Score List</Text>
    </>
  );

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

  return (
    <SafeAreaView style={styles.container}>
      {scoreModel.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={filteredData}
          renderItem={({item}) => <ScoreCard score={item} />}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      )}
    </SafeAreaView>
  );
};

export default connector(DetailsScreen);
