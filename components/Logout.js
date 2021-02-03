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

const UserAccount = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatarSource, setAvatarSource] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.headerview}>
        <View style={styles.view}>
          <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
            <Image
              style={{ height: 40, width: 40 }}
             /// source={require('./icon-back.png')}
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
            <TextInput value={name} onChangeText={(val) => setName(val)} style={{ fontSize: 18, marginLeft: -5, marginTop: -5 }} />
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ECECEC', paddingBottom: 15 }}>
            <Text style={{ color: 'grey', marginTop: 10 }}>
              Email
            </Text>
            <Text style={{ fontSize: 18, marginTop: 5, color: 'grey' }}>
              {email}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{ width: wp(95), paddingVertical: 15, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: hp(10) }}>
          <Text style={{ fontSize: 15, color: '#FFF', fontWeight: 'bold' }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: wp(95), paddingVertical: 15, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: hp(2) }}>
          <Text style={{ fontSize: 15, color: '#FFF', fontWeight: 'bold' }}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
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
