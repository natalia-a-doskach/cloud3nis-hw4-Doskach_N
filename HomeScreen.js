import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
//import {Context} from './Context';
import {changeIndex} from './Actions'
import {deleteNote} from './Actions'
//import { Icon } from 'react-native-elements'
import store from './Store'
import { connect } from 'react-redux'

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable
          title="Add a Note"
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Create')}>
          <Text style={styles.text}>Add A Note</Text>
        </Pressable>
        <View style={styles.scroll}>
          <ScrollView
            snapToInterval={Dimensions.get('screen').width}
            contentContainerStyle={{minHeight: '100%'}}>
            {
             this.props.notes.map((note, index) => (
             <View >
              <Pressable
                style={styles.buttons}
                key={index}
                title={`${note.title}`}
                onPress={() => {
                  changeIndex(index);
                  this.props.navigation.navigate('Change');
                }}>
                <Text style={styles.text}>{note.title}</Text>

              </Pressable>
<Pressable onPress={() => {deleteNote(index)} }><Image style={styles.image} source={require('./x.png')} /></Pressable>
</View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}
//HomeScreen.contextType = Context;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: '5%',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    margin: 15,
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#108afc',
    textColor: 'white',
  },
  buttons: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 15,
    marginVertical: 3,
    marginBottom: 0,
    borderRadius: 10,
    backgroundColor: '#BCDCF9',
    textColor: 'black',
  },
    image: {
      width: 30,
      height: 30,
      color: 'white',
      backgroundColor: '#108afc',
      borderRadius: 15,
      elevation: 3,
      alignSelf: 'center',
    },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default connect(mapStateToProps)(HomeScreen);
