import React from 'react';
import { View, Text, StatusBar, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../Styles';
import firebase from 'firebase';
import '@firebase/firestore';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={{ fontSize: 24 }}>Welcome to Open Container</Text>
        <Text style={{ padding: 10 }}>There is no recent activity to show you</Text>
        <Icon name="emoticon-sad-outline" size={50} color={'#efefef'} />
      </View>
    );
  }
}