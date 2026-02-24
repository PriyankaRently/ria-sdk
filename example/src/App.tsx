
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RiaWidget, ChatWidgetIcon } from 'react-native-ria-sdk';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (modalVisible) {
    return (
      <View style={styles.container}>
        <RiaWidget onClose={handleCloseModal} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
