import React from 'react';
import { View, StatusBar, Image } from 'react-native';
import { styles } from '../Styles';
import firebase from 'firebase';
import '@firebase/firestore';


export class loadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Activity' : 'LogIn' )
      // if (user) {
      //   this.props.navigation.navigate('Activity')
      //   console.log(user, "logged in")
      // } else {
      //   this.props.navigation.navigate('LogIn')
      //   console.log("No user logged in")
      // }
    });
  }

  render () {
    return(
      <View style={styles.loadingContainer}>
        <StatusBar barStyle='light-content' />
        <Image 
        style={{height: 100, width: 100, resizeMode: 'contain'}} 
        source={require('../assets/unicorn.png')} 
        />
      </View>
    )
  }
}