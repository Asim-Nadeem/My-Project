import AsyncStorage from '@react-native-community/async-storage'
import React, { Component, useEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen'
import { useFocusEffect } from '@react-navigation/native'

const UserAccount = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(true)
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const user_id = await AsyncStorage.getItem('userID')
    const token = await AsyncStorage.getItem('token')
    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + user_id, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        setProfileData(response)
        setLoader(false)
      })
      .catch(err => console.log(err))
  }

  const logout = async () => {
    const token = await AsyncStorage.getItem('token')
    fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
    // .then(res => res.json())
      .then(async response => {
        console.log(response)
        if (response.status === 200) {
          await AsyncStorage.removeItem('token')
          props.navigation.replace('LoginAndSignup')
        }
      })
      .catch(err => console.log(err))
  }

  if (loader === true) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} color='red' />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerview}>
          <View style={styles.view}>
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
              <Image
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={{ height: hp(22), justifyContent: 'center', alignItems: 'center' }}>
              {/* <TouchableOpacity onPress={() => imageUpload()}>
              <Image source={require('./icon-dummy-profile-image.png')} style={{ height: hp(15), width: hp(15), borderRadius: hp(20 / 2) }} />
            </TouchableOpacity> */}
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ECECEC' }}>
              <Text style={{ color: 'grey', fontSize: 12, marginTop: 10 }}>
                Full Name
              </Text>
              <Text style={{ fontSize: 15, marginTop: 5, color: 'grey' }}>
                {profileData.first_name + ' ' + profileData.last_name}
              </Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ECECEC', paddingBottom: 15 }}>
              <Text style={{ color: 'grey', marginTop: 10 }}>
                Email
              </Text>
              <Text style={{ fontSize: 18, marginTop: 5, color: 'grey' }}>
                {profileData.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate('UpdateProfile')} style={{ width: wp(95), paddingVertical: 15, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: hp(10) }}>
            <Text style={{ fontSize: 15, color: '#FFF', fontWeight: 'bold' }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logout()} style={{ width: wp(95), paddingVertical: 15, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: hp(2) }}>
            <Text style={{ fontSize: 15, color: '#FFF', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  headerview: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: wp(3),
    paddingTop: 10
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

})
export default UserAccount
