import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
  },
  image: {
    borderRadius: 8,
    elevation: 2,
    width: '100%',
    height: 200,
  },
  titleContainer: {
    marginVertical: 5,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
  },
  title: {
    flexWrap: 'wrap',
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  resultContainer: {},
  labelContainer: {},
  resultText: {
    fontSize: 12,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    fontFamily: 'open-sans-bold',
    marginHorizontal: 10,
  },
  bar: {
    marginHorizontal: 10,
    height: 20,
    backgroundColor: '#5B91E5',
    borderRadius: 5,
  },
});

export default styles;
