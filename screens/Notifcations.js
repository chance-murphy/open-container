import React from 'react';
import { View, Text, StatusBar, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../Styles';

export class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={{ padding: 10 }}>You have no notifications</Text>
        <Icon name="emoticon-sad-outline" size={50} color={'#efefef'} />
      </View>
    );
  }
}