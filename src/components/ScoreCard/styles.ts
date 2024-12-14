import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  image: {
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 2,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'blue',
  },
  title: {
    flexWrap: 'wrap',
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  resultContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    marginBottom: 5,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    flexGrow: 1,
  },
  resultText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bar: {
    height: 10,
    backgroundColor: '#5B91E5',
    borderRadius: 5,
  },
});
export default styles;
