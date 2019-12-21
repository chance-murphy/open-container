import React from 'react';
import * as Google from 'expo-google-app-auth';
import { View, Text, TextInput, Image, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { styles } from '../Styles';
import { db } from '../Config';
import firebase from 'firebase';
import '@firebase/firestore';

// Initialize Firebase

export class SplashScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    }
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: '661149819762-dtao5ls2u56t7eajsfv6p6cm1k3p4eij.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  onSignIn = googleUser => {
    // console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken,
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(result){
          console.log("User Signed In!");
          db.collection("users").doc(result.user.uid).set({
            id: result.user.uid,
            email: result.user.email,
            profilePicture: result.additionalUserInfo.profile.picture,
            fName: result.additionalUserInfo.profile.given_name,
            lName: result.additionalUserInfo.profile.family_name,
            userName: result.additionalUserInfo.profile.given_name.toLowerCase() + 
                      '_' + result.additionalUserInfo.profile.family_name.toLowerCase(),
          });
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  handleLogIn() {
    alert('This should log you in, but it is not working right now');
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.loadingContainer}
        scrollEnabled={false}
      >
        <StatusBar barStyle='light-content' />
        <View style={styles.logInHeader}>
          <Image
            style={{ height: 100, width: 100, resizeMode: 'contain' }}
            source={require('../assets/unicorn.png')}
          />
          <Text style={styles.appHeader}>Welcome to</Text>
          <Text style={styles.appHeader}>Open Container!</Text>
        </View>
        <View style={styles.logInTagline}>
          <Text style={styles.appTagline}>
            Please enter your log in credentials below. If you don't have an account
            yet, click the sign up button to join us! Alternatively, you may also sign
            in with your Google Account!
          </Text>
        </View>
        <View style={styles.logIn}>
          <TextInput
            placeholder="Email"
            style={styles.logInText}
            onChangeText={(value) => { this.setState({ email: value }) }}
            value={this.state.email}
          />
          <TextInput
            placeholder="Password"
            style={styles.logInText}
            onChangeText={(value) => { this.setState({ password: value }) }}
            value={this.state.password}
          />
          <View style={styles.logInButtons}>
            <Button
              buttonStyle={styles.logInSignUp}
              title="Log In"
              type='clear'
              onPress={() => this.handleLogIn()} />
            <Button
              buttonStyle={styles.logInSignUp}
              title="Sign Up"
              type='clear'
              onPress={() => this.props.navigation.navigate('SignUp')} />
          </View>
        </View>
        <View style={styles.logInGoogle}>
          <Button
            buttonStyle={styles.googleLogIn}
            title="Log In With Google"
            onPress={() => this.signInWithGoogleAsync() } 
          />
        </View>
        <View style={styles.logInGoogle}style={styles.logInEmpty}>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}