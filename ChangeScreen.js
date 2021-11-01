import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  BackHandler,
  Pressable,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {changeNote} from './Actions'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import store from './Store'

class ChangeScreen extends React.Component {
  state;
  constructor(props) {
    super(props);
    this.launchImageLibrary = this.launchImageLibrary.bind(this);
    this.state = {
        title: store.getState().notes[store.getState().currentIndex].title,
        note: store.getState().notes[store.getState().currentIndex].note,
        fileUris: store.getState().notes[store.getState().currentIndex].fileUris,
    };
  }
  launchImageLibrary() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          fileUris: [...this.state.fileUris, response.assets[0].uri],
        });
      }
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.forms}
          defaultValue={store.getState().notes[store.getState().currentIndex].title}
          onChangeText={value => this.setState({title: value})}
          placeholder="title"
          placeholderStyle={styles.body}
        />
        <TextInput
          defaultValue={store.getState().notes[store.getState().currentIndex].title}
          onChangeText={value => this.setState({note: value})}
          style={styles.body}
          multiline={true}
          textAlign={'left'}
          placeholder="note"
          placeholderStyle={styles.body}
        />
        <ScrollView
          horizontal={true}
          snapToInterval={Dimensions.get('screen').width}>
          {this.state.fileUris.map((uri, index) => (
            <Image key={index} style={styles.image} source={{uri: uri}} />
          ))}
        </ScrollView>
        <Pressable style={styles.button} onPress={this.launchImageLibrary}>
          {this.state.fileUris.length == 0 ? (
            <Text style={styles.text}>Add A Picture</Text>
          ) : (
            <Text style={styles.text}>Add Pictures</Text>
          )}
        </Pressable>
        <Pressable
          title="Save Changes"
          style={styles.button}
          onPress={() => {
            let note = {
              title: this.state.title == '' ? 'Untitled' : this.state.title,
              note: this.state.note,
              fileUris: this.state.fileUris,
            };
            changeNote(note);
            this.props.navigation.navigate('Home');
          }}>
          <Text style={styles.text}>Save Note</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
}

//ChangeScreen.contextType = Context;

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
  body: {
    width: '100%',
    flex: 3,
    paddingVertical: 15,
    marginVertical: 3,
    padding: 15,
    borderRadius: 10,
    textAlignVertical: 'top',
    backgroundColor: '#BCDCF9',
    textColor: 'black',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
  image: {
    width: 100,
    height: undefined,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    margin: 15,
    marginVertical: 3,
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#108afc',
    textColor: 'white',
  },
  forms: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 15,
    marginVertical: 3,
    borderRadius: 10,
    backgroundColor: '#BCDCF9',
    textColor: 'black',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    padding: 15,
    textColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default ChangeScreen;
