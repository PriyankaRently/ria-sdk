
import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { RiaProvider, RiaWidget, ChatWidgetIcon } from 'react-native-ria-sdk';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    console.log('Opening modal');
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}
        transparent={false}
      >
        <RiaWidget onClose={handleCloseModal} />
      </Modal>
      <ChatWidgetIcon
        screenName="Home"
        enableShineAnimation={true}
        onPress={handleOpenModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
