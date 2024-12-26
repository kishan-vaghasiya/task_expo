import React, {useEffect, useState} from "react"
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/Ionicons"
import {useSelector} from "react-redux"
import LoginScreen from "../screens/auth/LoginScreen"
import HomeScreen from "../screens/main/HomeScreen"
import ProfileScreen from "../screens/main/ProfileScreen"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SafeAreaView } from "react-native"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* {/* <Tab.Screen name="Settings" component={} />  */}
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
      console.log("isLoggedIn", isLoggedIn)

      setIsLoggedIn(isLoggedIn === "true")
    }
    checkAuthStatus()
  }, [])

  return (
    // <NavigationContainer>
    <SafeAreaView style={{flex:1}}>
      {!isLoggedIn ? authNavigator() : mainNavigator()}
    </SafeAreaView>
    // </NavigationCo ntainer>
  )
}



const authNavigator = () =>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  )
}

const mainNavigator = () =>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="MainTab">
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="LogOut" component={LoginScreen} />

    </Stack.Navigator>
  )
} 

export default AppNavigator
