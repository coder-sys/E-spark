import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { registerRootComponent } from 'expo';

import { StyleSheet, Text, View } from 'react-native';
import SignIn from './sign_in';
import Particle_Background from './starbg';
import Login from './login';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomePage from './homepage'
import FolderContent from './foldercontent';
import Folder from './folder';
import Frontpage from './frontpage';
export default function App() {
  return (
    <SafeAreaProvider >
<AppContainer />

    </SafeAreaProvider>
  );
}
registerRootComponent(App)
const sn = createSwitchNavigator({
  Frontpage:Frontpage,
SignIn:SignIn,
Login:Login,
HomePage:HomePage,
FolderContent:FolderContent,
})
const AppContainer = createAppContainer(sn)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
