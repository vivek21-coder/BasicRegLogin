import React, {Component} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import firebase from '../database/firebaseDb';
import CustomButton from './button/custom-button/CustomButton';
import {TextField} from './react-native-material-textfield';

export default class Signup extends Component {

  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmpassword:'',
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {

    if (this.state['password'] !== this.state['confirmpassword']){
      Alert.alert('Password','Passwords do not match');
      return;
    }

    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          }).then(() => {
            console.log('User registered successfully!');
            this.setState({
              isLoading: false,
              displayName: '',
              email: '',
              password: '',
            });
            res.user.sendEmailVerification().then(() => {
              Alert.alert('Check your Inbox', 'Password verification link has been sent to the specified email');
            });
          });

        })
        .catch(error => {
          console.log(error.message);
          const stateCopy = {...this.state, isLoading: false};
          this.setState(stateCopy);
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        });

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
          label="Name"
          value={this.state.displayName}
          tintColor='#3740FE'
          autoCompleteType='name'
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />
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
        <TextField
          containerStyle={styles.inputStyleConfirm}
          label="Confirm Password"
          value={this.state.confirmpassword}
          onChangeText={(val) => this.updateInputVal(val, 'confirmpassword')}
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
          title="SIGN-UP"
          click={() => this.registerUser()}
        />

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
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
  inputStyleConfirm: {
    marginTop:-16,
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
