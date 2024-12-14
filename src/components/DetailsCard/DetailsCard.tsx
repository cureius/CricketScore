import React from 'react';
import {Text, View} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {getISOCodeFromCountryName} from '../../utils/countryCodeMapper';
import styles from './styles';

interface DetailsCardProps {
  country: string;
  score: number;
  averageScore?: number;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
  country,
  score,
  averageScore,
}) => {
  return (
    <View style={styles.container}>
      <>
        <View style={styles.headerContainer}>
          <>
            {score && (
              <CountryFlag
                isoCode={getISOCodeFromCountryName(country)}
                size={500}
                style={styles.image}
              />
            )}
          </>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{country}</Text>
            <Text style={styles.resultText}>
              Avarage Score: {(averageScore || 0).toFixed(2)}
            </Text>
            <View style={[styles.bar, {width: 2 * (averageScore || 0)}]} />
            <View style={styles.resultContainer} />
          </View>
        </View>
      </>
    </View>
  );
};

export default DetailsCard;
