import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    backgroundColor: '#867070',
    alignItems: 'center',
    paddingHorizontal: 18
  },
  titulo: {
    fontSize: 14,
    color: '#F5EBEB',
    fontWeight: '900',
    lineHeight: 24,
  },
  config: {
    height: 40,
    width: 40
  },
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
