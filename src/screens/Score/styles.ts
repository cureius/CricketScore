import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 80,
  },
  list: {
    flexGrow: 1,
  },
  emptyText: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 10,
    left: 8,
    right: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    borderRadius: 20,
    backgroundColor: '#0080008A',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff7f',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
  },
  tabButtonContainer: {
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#ffffff7f',
  },
  activeTab: {
    backgroundColor: '#007bff0f',
    borderColor: '#fff',
    borderWidth: 1,
  },
  activeTabOffline: {
    backgroundColor: '#ff5c5c',
  },
  activeTabOnline: {
    backgroundColor: '#4CBB17',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
