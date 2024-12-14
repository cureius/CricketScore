import React from 'react';
import {Text, View} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {getISOCodeFromCountryName} from '../../utils/countryCodeMapper';
import styles from './styles';

interface ScoreCardProps {
  score: {
    urlToImage?: string;
    title?: string;
    country?: string;
    score?: number;
    averageScore?: number;
  };
}

const ScoreCard: React.FC<ScoreCardProps> = ({score}) => {
  return (
    <View style={styles.container}>
      {score.country && (
        <CountryFlag
          isoCode={getISOCodeFromCountryName(score.country)}
          size={35}
          style={styles.image}
        />
      )}
      <View style={styles.titleContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.title}>
            {score.country} : {score.score}
          </Text>
          <Text style={styles.resultText}>
            Avg: {(score.averageScore || 0).toFixed(2)}
          </Text>
        </View>
        <View style={styles.resultContainer}>
          <View style={[styles.bar, {width: 2 * (score.averageScore || 0)}]} />
        </View>
      </View>
    </View>
  );
};

export default ScoreCard;
