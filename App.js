import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
//import {Context} from './Context';
import HomeScreen from './HomeScreen';
import CreateScreen from './CreateScreen';
import ChangeScreen from './ChangeScreen';
import store from './Store'


const Stack = createNativeStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Create" component={CreateScreen} />
            <Stack.Screen name="Change" component={ChangeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

//connect(
//state => ({notes: state}),
//dispatch => ({})
//)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//export {connect}
export default App;
