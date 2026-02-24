"use strict";

import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000'
  },
  closeButton: {
    padding: 5
  },
  closeText: {
    fontSize: 18,
    color: '#007AFF'
  },
  content: {
    flex: 1
  }
});
//# sourceMappingURL=ChatWithUsModal.style.js.map