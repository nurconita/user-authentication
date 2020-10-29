import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import LoadScreen from './screens/loading';

const Stack = createStackNavigator()
const App = () => {
  const [foundToken, setFoundToken] = useState('')
  const [isLoad, setIsLoad] = useState(true)

  const checkToken = async () => {
    try{
      let findingToken = await AsyncStorage.getItem('token')
      setFoundToken(findingToken)
      setIsLoad(false)
    } catch (error) {
      console.log(error)
    }
  }

  const loginAction = async () => {

    let dummyToken = 'CodeSeemToken'

    try {
      await AsyncStorage.setItem('token', dummyToken)
      setFoundToken(dummyToken)
    } catch (error){
      console.log(error)
    }
  }

  const logoutAction = async () => {
    try {
      await AsyncStorage.removeItem('token')
      setFoundToken('')
    } catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    checkToken();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {
        foundToken
        ?<Stack.Screen name="Home">
          {props => <HomeScreen {...props} logout={logoutAction}/>}
        </Stack.Screen>
        :(isLoad
        ?<Stack.Screen name="Load"
        options={{headerShown:false}}>
        {props => <LoadScreen {...props} />}
        </Stack.Screen>
        :<Stack.Screen name="Login">
          {props => <LoginScreen {...props} login={loginAction}/>}
          </Stack.Screen>
        )
      }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
