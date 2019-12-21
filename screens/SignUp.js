import React from 'react';
import { View, Text, TextInput, Image, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { styles } from '../Styles';
import firebase from 'firebase';
import '@firebase/firestore';

export class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: '',
      lName: '',
      uName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: null,
    }
  }

  handleSignUp = () => {
    alert('This should sign you up, but it is not working right now');
  }

  // handleSignUp() {
  //   // alert('Sign Up!');
  //   if (this.state.password === this.state.confirmPassword) {
  //     firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  //     .then(() => this.props.navigation.navigate('Activity'))
  //     .catch(error => this.setState({ errorMessage: error.message }))
  //   } else {
  //     alert('Your passwords do not match');
  //   }
  // }

  render() {
    return (
      <KeyboardAwareScrollView 
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.loadingContainer}
        scrollEnabled={false}
      >
        <StatusBar barStyle='light-content' />
        <View style={styles.signUpHeader}>
          <Image
            style={{ height: 100, width: 100, resizeMode: 'contain' }}
            source={require('../assets/unicorn.png')}
          />
          <Text style={styles.appHeader}>Sign Up!</Text>
        </View>
        <View style={styles.signUpTagLine}>
          <Text style={styles.appTagline}>Please complete the form below to finish the sign in process.</Text>
        </View>
        <View 
          style={styles.signUpForm}>
          <TextInput
            placeholder="First Name"
            style={styles.signUpText}
            onChangeText={(value) => { this.setState({ fName: value }) }}
            value={this.state.fName}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.signUpText}
            onChangeText={(value) => { this.setState({ lName: value }) }}
            value={this.state.lName}
          />
          <TextInput
            placeholder="Username"
            style={styles.signUpText}
            onChangeText={(value) => { this.setState({ uName: value }) }}
            value={this.state.uName}
          />
          <TextInput
            placeholder="Email"
            style={styles.signUpText}
            onChangeText={(value) => { this.setState({ email: value }) }}
            value={this.state.email}
          />
          <TextInput
            placeholder="Password"
            style={styles.signUpText}
            onChangeText={(value) => { this.setState({ password: value }) }}
            value={this.state.password}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.signUpText}
            onChangeText={(value) => { this.setState({ confirmPassword: value }) }}
            value={this.state.confirmPassword}
          />
        </View>
        <View style={styles.signUpButton}>
          <Button 
            buttonStyle={styles.googleLogIn}
            title="Complete Sign Up"
            onPress={() => this.handleSignUp()} 
            />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}