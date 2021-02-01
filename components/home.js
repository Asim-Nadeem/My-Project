import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect } from 'react'

import { StyleSheet, View, Text } from 'react-native'

const home = () => {
  useEffect(async () => {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
  }, [])
  return (
    <View style={styles.MainView}>
      <View style={{ backgroundColor: '#321637', height: '8%', width: '100%', justifyConetent: 'center', alignItems: 'center' }}>
        <Text style={styles.Header}>Coffee Review</Text>
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

  },

  Header: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center'

  }
})

export default home
