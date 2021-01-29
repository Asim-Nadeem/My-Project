import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const home = () => {
  return (
    <View style={styles.MainView}>
      <View style={{ backgroundColor: '#FF7077', height: '10%', width: '100%', justifyConetent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 50 }}>Coffee Review</Text>
      </View>
      <Text>First Tab in React Native</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  MainView: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'orange'

  }
})

export default home
