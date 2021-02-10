import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-community/async-storage'
/// import { useFocusEffect } from '@react-navigation/native'

const UpdateAccount = (props) => {
  const [firstName, setFirstName] = useState(props.route.params.profile.first_name ? props.route.params.profile.first_name : '')
  const [lastName, setLastName] = useState(props.route.params.profile.last_name ? props.route.params.profile.last_name : '')
  const [email, setEmail] = useState(props.route.params.profile.email ? props.route.params.profile.email : '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const updateProfile = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log(props.route.params.profile)
    console.log(JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }))
    if (password === confirmPassword) {
      console.log('http://10.0.2.2:3333/api/1.0.0/user/' + props.route.params.profile.user_id + '    ' + token)
      fetch('http://10.0.2.2:3333/api/1.0.0/user/' + props.route.params.profile.user_id, {
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        })
      })
      // .then(res => res.json())
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            props.navigation.goBack()
          } else {
            alert('Check all the fields')
          }
        })
        .catch(er => console.log(er))
    } else {
      alert('Password should be same')
    }
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerview}> */}
      {/* <View style={styles.view}>
          <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
            <Image
              style={{ height: 40, width: 40 }}
              source={require('./icon-back.png')}
            />
          </TouchableOpacity>
        </View> */}
      {/* </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
          {/* <View style={{ height: hp(17), justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => imageUpload()}>
              {
                            avatarSource === ''
                              ? <Image source={require('./icon-dummy-profile-image.png')} style={{ height: hp(15), width: hp(15), borderRadius: hp(20 / 2) }} />
                              : <Image source={avatarSource} style={{ height: hp(15), width: hp(15), borderRadius: hp(20 / 2) }} />
                        }
            </TouchableOpacity>
          </View> */}
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ECECEC' }}>
            <Text style={{ color: 'grey', fontSize: 12, marginTop: 10 }}>
              First Name
            </Text>
            <TextInput value={firstName} onChangeText={(val) => setFirstName(val)} style={{ fontSize: 18, marginLeft: -5, marginTop: -5 }} />
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ECECEC' }}>
            <Text style={{ color: 'grey', fontSize: 12, marginTop: 10 }}>
              Last Name
            </Text>
            <TextInput value={lastName} onChangeText={(val) => setLastName(val)} style={{ fontSize: 18, marginLeft: -5, marginTop: -5 }} />
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ECECEC', paddingBottom: 15 }}>
            <Text style={{ color: 'grey', marginTop: 10 }}>
              Email
            </Text>
            <TextInput value={email} onChangeText={(val) => setEmail(val)} style={{ fontSize: 18, marginLeft: -5, marginTop: -5 }} />
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ECECEC' }}>
            <Text style={{ color: 'grey', fontSize: 12, marginTop: 10 }}>
              Password
            </Text>
            <TextInput value={password} onChangeText={(val) => setPassword(val)} placeholder='******' style={{ fontSize: 18, marginLeft: -5, marginTop: -5 }} />
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ECECEC' }}>
            <Text style={{ color: 'grey', fontSize: 12, marginTop: 10 }}>
              Confirm Password
            </Text>
            <TextInput value={confirmPassword} onChangeText={(val) => setConfirmPassword(val)} placeholder='******' style={{ fontSize: 18, marginLeft: -5, marginTop: -5 }} />
          </View>
        </View>
        <TouchableOpacity onPress={() => updateProfile()} style={{ width: wp(95), paddingVertical: 15, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: hp(5) }}>
          <Text style={{ fontSize: 15, color: '#FFF', fontWeight: 'bold' }}>Update</Text>
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
export default UpdateAccount
