import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const reviews = () => {
  return (
    <View style={styles.MainView}>
      <Text>First Tab in React Native</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  }
})

export default reviews
