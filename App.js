/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-community/google-signin';
GoogleSignin.configure();
class App extends React.Component{
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error)
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error)
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error)
        // play services not available or outdated
      } else {
        console.log(error)
        // some other error happened
      }
    }
  };
  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log(currentUser)
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      const output=await GoogleSignin.signOut();
      console.log(output)
    } catch (error) {
      console.error(error);
    }
  };
  render(){
    return(
      <View>
        <Button onPress={()=>this.signIn()} title="signin" />
        <Button onPress={()=>this.getCurrentUser()} title="Get current user" />
        <Button onPress={()=>this.signOut() } title="Sign out" />
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
          //disabled={this.state.isSigninInProgress} 
        />
      </View>
    )
  }
}



export default App;
