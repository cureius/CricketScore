import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScoreScreen from '../screens/Score/ScoreScreen';
import DetailsScreen from '../screens/Details/DetailsScreen';

export type RootStackParamList = {
  Score: {state: string};
  Home: undefined;
  Search: undefined;
  Profile: {userId: string};
  Details: {country: string; score: number; averageScore: number};
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Score">
        <Stack.Screen
          name="Score"
          component={ScoreScreen}
          options={{
            title: 'Cricket Score',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
