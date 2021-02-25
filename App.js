import React from 'react'
// import { StyleSheet, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator } from '@react-navigation/stack'
import ReviewScreen from './components/reviews'
import LocationScreen from './components/Location'
import LogoutScreen from './components/Logout'
import LoginAndSignup from './components/LoginAndSignup'
import UpdateProfile from './components/updateProfile'
import PostDetails from './components/postDetails'
import MyReviews from './components/myReviews'
import MyPostDetails from './components/myPostDetails'

const Tab = createBottomTabNavigator()

const myApp = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      style={{ backgroundColor: 'red' }}
    >
      <Tab.Screen
        name='Home'
        component={ReviewScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='coffee' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='My Reviews'
        component={LocationScreen}
        options={{
          tabBarLabel: 'Favourtie Location',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='google-maps' color={color} size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name='MY Reviews'
        component={MyReviews}
        options={{
          tabBarLabel: 'My Reviews',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='book' color={color} size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name='Logout'
        component={LogoutScreen}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='account-settings' color={color} size={26}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const AuthStack = createStackNavigator()
const MainStack = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName='LoginAndSignup'
        headerMode='none'
        style={{ backgroundColor: 'red' }}
      >
        <AuthStack.Screen
          name='LoginAndSignup'
          component={LoginAndSignup}
        />
        <AuthStack.Screen
          name='BottomTab'
          component={myApp}
        />
        <AuthStack.Screen
          name='UpdateProfile'
          component={UpdateProfile}
        />
        <AuthStack.Screen
          name='PostDetails'
          component={PostDetails}
        />
        <AuthStack.Screen
          name='MyPostDetails'
          component={MyPostDetails}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

export default MainStack
