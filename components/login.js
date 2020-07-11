import React, {Component} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import firebase from '../database/firebaseDb';

import CustomButton from './button/custom-button/CustomButton';
import {TextField} from './react-native-material-textfield';


export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          if (!res.user.emailVerified) {
            Alert.alert(
              'Email address not Verified',
              'Click RESEND to send the verification code again',
              [
                {
                  text: 'IGNORE',
                },
                {
                  text: 'RESEND',
                  onPress: () => res.user.sendEmailVerification(),
                },
              ],
            );
            firebase.auth().signOut().then(() => {
            });
            const stateCopy = {...this.state, isLoading: false};
            this.setState(stateCopy);
          } else {
            console.log('User logged-in successfully!');
            this.setState({
              isLoading: false,
              email: '',
              password: '',
            });
            this.props.navigation.navigate('Dashboard');
          }
        })
        .catch(error => {
            console.log(error.message);
            const stateCopy = {...this.state, isLoading: false};
            this.setState(stateCopy);
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          },
        );
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextField
          containerStyle={styles.inputStyle}
          label="Email"
          value={this.state.email}
          autoCapitalize='none'
          tintColor='#3740FE'
          autoCompleteType='email'
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextField
          containerStyle={styles.inputStyle}
          label="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          characterRestriction={20}
          maxLength={20}
          autoCapitalize='none'
          secureTextEntry={true}
          autoCompleteType='password'
          tintColor='#3740FE'
        />
        <CustomButton
          styleBG={styles.buttonBG}
          styleTxt={styles.buttonTxt}
          title="SIGN-IN"
          click={() => this.userLogin()}
        />

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    alignSelf: 'center',
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonBG: {
    marginTop: 20,
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#3740FE',
    borderRadius: 30,
  },
  buttonTxt: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
  },
});
