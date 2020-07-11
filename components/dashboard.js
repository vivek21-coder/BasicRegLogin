import React, {Component} from 'react';
import {BackHandler, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import firebase from '../database/firebaseDb';
import CustomButton from './button/custom-button/CustomButton';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
      validCloseWindow: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    if (this.state.validCloseWindow) {
      BackHandler.exitApp();
      return;
    }
    this.state.validCloseWindow = true;
    setTimeout(() => {
      this.state.validCloseWindow = false;
    }, 1500);
    ToastAndroid.show('Press Again To Exit !', ToastAndroid.SHORT);
    return true;
  };

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('startPage');
    })
      .catch(error => this.setState({errorMessage: error.message}));
  };

  render() {
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
    };

    if (this.state.displayName === '' || this.state.displayName == null) {
      this.props.navigation.navigate('startPage');
    }

    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>

        <CustomButton
          styleBG={styles.buttonBG}
          styleTxt={styles.buttonTxt}
          title="Logout"
          click={() => this.signOut()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 25,
    marginBottom: 20,
  },
  buttonBG: {
    marginTop: 20,
    justifyContent: 'center',
    height: 50,
    width: '50%',
    backgroundColor: '#3740FE',
    borderRadius: 20,
  },
  buttonTxt: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
  },
});
