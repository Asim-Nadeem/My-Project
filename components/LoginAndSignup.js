import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  ToastAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-community/async-storage'

const LoginAndSignup = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [iconName, setIconName] = useState('ios-eye')
  const [iconNameConfirm, setIconNameConfirm] = useState('ios-eye')
  const [iconNameSignUp, setIconNameSignup] = useState('ios-eye')
  const [secure, setSecure] = useState(true)
  const [secureSignUp, setSecureSignup] = useState(true)
  const [secureConfirm, setSecureConfirm] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [focusButton, setFocusButton] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordSignup, setPasswordSignup] = useState('')
  const [emailSignup, setEmailSignup] = useState('')
  const [loader, setLoader] = useState(true)
  const [InvalidPassword, setInvalidPassword] = useState(false)
  const [passFocus, setPassFocus] = useState(false)
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    async function tokenData () {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        props.navigation.replace('BottomTab')
      }
    }
    tokenData()
  }, [])

  const onLoginClick = (email, password) => {
    if (password === '') {
      ToastAndroid.show('Password is empty', ToastAndroid.SHORT, ['UIAlertController'])
      setIsLoading(false)
      return
    }
    if (email === '') {
      ToastAndroid.show('Email is empty', ToastAndroid.SHORT, ['UIAlertController'])
      setIsLoading(false)
      return
    }

    props.navigation.replace('BottomTab')
    setIsLoading(false)
  }

  const login = (email, password) => {
    console.log(email + '                                 ' + password)
    if (email != '' && password != '') {
      fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(response => response.json())
        .then(async res => {
          console.log(res)
          await AsyncStorage.setItem('token', res.token)
          await AsyncStorage.setItem('userID', JSON.stringify(res.id))
          props.navigation.replace('BottomTab')
        })
        .catch(error => console.log(error))
    }
  }

  const createAccount = () => {
    console.log(emailSignup + passwordSignup + passwordConfirm + firstName + lastName)
    if (emailSignup !== '' && passwordSignup !== '' && passwordConfirm !== '' && firstName !== '' && lastName !== '') {
      if (passwordSignup === passwordConfirm) {
        fetch('http://10.0.2.2:3333/api/1.0.0/user', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: emailSignup,
            password: passwordSignup
          })
        })
          .then(response => {
            console.log(response)
            if (response.ok === true) {
              login(emailSignup, passwordSignup)
            } else {
              ToastAndroid.show('Something went wrong', ToastAndroid.SHORT, ['UIAlertController'])
              setIsLoading(false)
            }
          })
          .catch(res => console.log(res))
        setIsLoading(false)
      } else {
        ToastAndroid.show('Passwords must be same', ToastAndroid.SHORT, ['UIAlertController'])
        setIsLoading(false)
      }
    } else {
      ToastAndroid.show('All fields are required', ToastAndroid.SHORT, ['UIAlertController'])
      setIsLoading(false)
    }
  }

  const HideShowTask = () => {
    if (secure === false) {
      setIconName('ios-eye')
      setSecure(!secure)
    } else {
      setIconName('ios-eye-off')
      setSecure(!secure)
    }
  }

  const HideShowTaskConfirm = () => {
    if (secureConfirm === false) {
      setIconNameConfirm('ios-eye')
      setSecureConfirm(!secureConfirm)
    } else {
      setIconNameConfirm('ios-eye-off')
      setSecureConfirm(!secureConfirm)
    }
  }

  const HideShowTaskSignUp = () => {
    if (secureSignUp === false) {
      setIconNameSignup('ios-eye')
      setSecureSignup(!secureSignUp)
    } else {
      setIconNameSignup('ios-eye-off')
      setSecureSignup(!secureSignUp)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
      <ScrollView contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false}>
        <View style={{
          justifyContent: 'flex-end',
          height: hp(97)
        }}
        >
          {
            focusButton
              ? <Image style={{ height: 70, width: 70, alignSelf: 'center', tintColor: 'red', marginBottom: hp(20) }} source={{}} />
              : null
          }
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              disabled={isLoading}
              onPress={() => {
                setIsLoading(false)
                setFocusButton(true)
                setIconName('ios-eye')
              }}
              style={{
                width: '50%',
                paddingVertical: hp(3),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: focusButton
                    ? 'red'
                    : 'grey'
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isLoading}
              onPress={() => {
                setIconNameConfirm('ios-eye')
                setIconNameSignup('ios-eye')
                setFocusButton(false)
              }}
              style={{
                width: '50%',
                paddingVertical: hp(3),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color:
                    focusButton === false
                      ? 'red'
                      : 'grey'
                }}
              >
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
          {focusButton
            ? (
              <View
                style={{ backgroundColor: 'white', paddingHorizontal: 10, elevation: 2 }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 15,
                    marginLeft: 5
                  }}
                >
                  Welcome Back
                </Text>
                <View
                  style={{
                    borderBottomColor: '#ECECEC',
                    borderBottomWidth: 1
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      marginTop: 20,
                      marginLeft: 5,
                      color: 'grey'
                    }}
                  >
                    Email Address
                  </Text>
                  <TextInput
                    onChangeText={val => setEmail(val)}
                    keyboardType='email-address'
                    style={{
                      fontSize: 16,
                      height: hp(6.5)
                    }}
                    onSubmitEditing={() => { secondTextInput.focus() }}
                    blurOnSubmit={false}
                    placeholder='Enter your email'
                  />
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    marginTop: 10,
                    marginLeft: 5,
                    color: 'grey'
                  }}
                >
                  Password
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#ECECEC',
                    borderBottomWidth: 1
                  }}
                >
                  <TextInput
                    onSubmitEditing={() => {
                      setIsLoading(true)
                      login(email, password)
                    }}
                    secureTextEntry={secure}
                    style={{
                      fontSize: 16,
                      height: hp(6.5),
                      width: '90%'
                    }}
                    ref={(input) => { secondTextInput = input }}
                    placeholder='Enter your password'
                    keyboardType='default'
                    autoCapitalize='none'
                    underlineColorAndroid='transparent'
                    windowSoftInputMode='adjustPan'
                    onChangeText={val => setPassword(val)}
                  />
                  <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={() => HideShowTask()}
                  >
                    <Icon
                      name={iconName}
                      size={25}
                      color='#ddd'
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    paddingVertical: hp(3),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center'
                    }}
                  >
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12
                      }}
                    >
                      Forgot Password ?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={isLoading}
                    style={{
                      backgroundColor: 'red',
                      // height: 35,
                      paddingVertical: hp(1.5),
                      justifyContent: 'center',
                      alignSelf: 'center',
                      width: wp(30),
                      borderRadius: 5
                    }}
                    onPress={() => {
                      setIsLoading(true)
                      login(email, password)
                    }}
                  >
                    {
                      isLoading
                        ? <ActivityIndicator color='white' size={20} />
                        : <Text
                          style={{
                            fontSize: 16,
                            color: 'white',
                            alignSelf: 'center'
                          }}
                        >
                          Login
                        </Text>
                    }
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
                <View
                  style={{ backgroundColor: 'white', paddingHorizontal: 10 }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      marginTop: 15,
                      marginLeft: 5
                    }}
                  >
                    Be a part
                  </Text>
                  <View
                    style={{
                      borderBottomColor: '#ECECEC',
                      borderBottomWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        marginTop: 20,
                        marginLeft: 5,
                        color: 'grey'
                      }}
                    >
                      First Name
                    </Text>
                    <TextInput
                      onChangeText={val => setFirstName(val)}
                      style={{
                        fontSize: 16,
                        height: hp(6.5)
                      }}
                      blurOnSubmit={false}
                      placeholder='Enter your first name'
                    />
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#ECECEC',
                      borderBottomWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        marginTop: 20,
                        marginLeft: 5,
                        color: 'grey'
                      }}
                    >
                      Last Name
                    </Text>
                    <TextInput
                      onChangeText={val => setLastName(val)}
                      style={{
                        fontSize: 16,
                        height: hp(6.5)
                      }}
                      blurOnSubmit={false}
                      placeholder='Enter your last name'
                    />
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#ECECEC',
                      borderBottomWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        marginTop: 10,
                        marginLeft: 5,
                        color: 'grey'
                      }}
                    >
                      Email Address
                    </Text>
                    <TextInput
                      onChangeText={val =>
                        setEmailSignup(val)}
                      style={{
                        fontSize: 16,
                        height: hp(6.5)
                      }}
                      keyboardType='email-address'
                      blurOnSubmit={false}
                      placeholder='Enter your email'
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      marginTop: 10,
                      marginLeft: 5,
                      color: InvalidPassword
                        ? 'red'
                        : 'grey'
                    }}
                  >
                    Password
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: InvalidPassword
                        ? 'red'
                        : '#ECECEC'
                    }}
                  >
                    <TextInput
                    //  onSubmitEditing={() => {
                    //      setState({isLoading: true});
                    //      onLoginClick();
                    //  }}
                      secureTextEntry={secureSignUp}
                      style={{
                        fontSize: 16,
                        height: hp(6.5),
                        width: '90%'
                      }}
                      placeholder='Password'
                      keyboardType='default'
                      autoCapitalize='none'
                      blurOnSubmit={false}
                      underlineColorAndroid='transparent'
                      windowSoftInputMode='adjustPan'
                      onChangeText={val =>
                        setPasswordSignup(val)}
                    />

                    <TouchableOpacity
                      style={{ justifyContent: 'center' }}
                      onPress={() => HideShowTaskSignUp()}
                    >
                      <Icon
                        name={iconNameSignUp}
                        size={25}
                        color='#ddd'
                      />
                    </TouchableOpacity>
                  </View>
                  {
                  InvalidPassword
                    ? (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 12,
                          paddingVertical: 5
                        }}
                      >
                        Password at least 6 char long and have at least one non alphanumeric character , one digit ('0'-'9'), one uppercase ('A'-'Z') and one lowercase ('a'-'z').
                      </Text>
                      ) : null
                }

                  <Text
                    style={{
                      fontSize: 10,
                      marginTop: 10,
                      marginLeft: 5,
                      color: 'grey'
                    }}
                  >
                    Confirm password
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: '#ECECEC'
                    }}
                  >
                    <TextInput
                      onSubmitEditing={() => {
                        setIsLoading(true)
                        createAccount()
                      }}
                      secureTextEntry={secureConfirm}
                      style={{
                        fontSize: 16,
                        height: hp(6.5),
                        width: '90%'
                      }}
                      placeholder='Confirm Password'
                      keyboardType='default'
                      autoCapitalize='none'
                      underlineColorAndroid='transparent'
                      windowSoftInputMode='adjustPan'
                      onChangeText={val =>
                        setPasswordConfirm(val)}
                    />
                    <TouchableOpacity
                      style={{ justifyContent: 'center' }}
                      onPress={() => HideShowTaskConfirm()}
                    >
                      <Icon
                        name={iconNameConfirm}
                        size={25}
                        color='#ddd'
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      paddingVertical: hp(3),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: 'white',
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center'
                      }}
                    >
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 12
                        }}
                      >
                        I agree to terms and conditions
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={isLoading}
                      style={{
                        backgroundColor: 'red',
                        // height: 35,
                        paddingVertical: hp(1.5),
                        justifyContent: 'center',
                        alignSelf: 'center',
                        width: wp(30),
                        borderRadius: 5
                      }}
                      onPress={() => {
                        setIsLoading(true)
                        createAccount()
                      }}
                    >
                      {
                      isLoading
                        ? <ActivityIndicator color='white' size={20} />
                        : <Text
                            style={{
                              fontSize: 16,
                              color: 'white',
                              alignSelf: 'center'
                            }}
                          >
                          Sign Up
                        </Text>
                    }
                    </TouchableOpacity>
                  </View>
                </View>)}
        </View>
      </ScrollView>
    </View>
  )
}

export default LoginAndSignup
