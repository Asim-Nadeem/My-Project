import React from 'react'
// import { StyleSheet, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './components/home'
import ReviewScreen from './components/reviews'
import CreateReviewScreen from './components/createReviews'
import MyReviewScreen from './components/MyReviews'
import LogoutScreen from './components/Logout'
import LoginAndSignup from './components/LoginAndSignup'
// import { create } from 'react-test-renderer'

const Tab = createBottomTabNavigator()

const myApp = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      style={{ backgroundColor: 'red' }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Reviews'
        component={ReviewScreen}
        options={{
          tabBarLabel: 'Reviews',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='coffee' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Create Reviews'
        component={CreateReviewScreen}
        options={{
          tabBarLabel: 'Creat Review',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='plus-thick' color={color} size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name='My Reviews'
        component={MyReviewScreen}
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
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

export default MainStack
