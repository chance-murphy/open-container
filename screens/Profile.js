import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { styles } from '../Styles';
import { db } from '../Config';
import firebase from 'firebase';

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
      favorites: [],
    }

  }

  componentDidMount() {
    console.log("test");
    let currentUser = firebase.auth().currentUser;

    this.userRef = db.collection("users");
    this.userRef.get().then(queryRef => {
      let user = []
      queryRef.forEach(docRef => {
        let docData = docRef.data();
        if ( docData.id === currentUser.uid ) {
          let info = {
            email: docData.email,
            fName: docData.fName,
            lName: docData.lName,
            userName: docData.userName,
            id: docData.id,
            profilePicture: docData.profilePicture,
          }
        user.push(info);
        this.setState({ currentUser: user });
        }
      })
    });

    this.favsRef = db.collection("users").doc(currentUser.uid).collection("favorites");
    this.favsRef.get().then(queryRef => {
      let favBeers = [];
      queryRef.forEach(docRef => {
        let docData = docRef.data();
        let newBeer = {
          name: docData.name,
          rating: docData.rating,
          num_ratings: docData.num_ratings,
          image: docData.image,
          beer_id: docData.beer_id,
          brewery_name: docData.brewery_name,
          brewery_id: docData.brewery_id,
          abv: docData.abv,
          srm: docData.srm,
          availability: docData.availability,
          cat_name: docData.cat_name,
          cat_id: docData.cat_id,
          descript: docData.descript,
          website: docData.website,
          street: docData.street,
          city: docData.city,
          state: docData.state,
          country: docData.country,
          coordinates: docData.coordinates,
        }
        favBeers.push(newBeer);
      })
      this.setState({ favorites: favBeers });
    });
  }

  viewBeer(beerToView) {
    // console.log(beerToView);
    this.props.navigation.navigate('BeverageInfo', {
      beer: beerToView,
    });
  }

  render() {
    if ( this.state.favorites < 1 ) {
      return (
        <View style={styles.container}>
          <NavigationEvents 
          onDidFocus={ () => this.componentDidMount() }/>
          <StatusBar barStyle='light-content' />
          <View style={styles.userInfo}>
            <FlatList
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
              data={this.state.currentUser}
              scrollEnabled='false'
              renderItem={
                ({ item, index }) => {
                  return (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                      <View style={styles.userPic}>
                        <Image
                          style={styles.profileImage}
                          source={{ uri: item.profilePicture }}
                        />
                        <Text style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: '#fff',
                          paddingTop: 10
                        }}>{item.fName + " " + item.lName}</Text>
                        <Text style={{ color: '#fff', paddingBottom: 5, }}>{item.userName}</Text>
                      </View>
                      <View style={styles.userLocation}>
                        <View style={styles.location}>
                          <Icon name="map-marker" size={18} color={'#fff'} padding={5} />
                          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', padding: 5, }}>Ann Arbor, MI</Text>
                        </View>
                      </View>
                    </View>
                  )
                }
              }
            />
          </View>
          <View style={styles.userActivity}>
            <Text style={{ padding: 10 }}>You have no favorites to display</Text>
            <Icon name="emoticon-sad-outline" size={50} color={'#efefef'} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <NavigationEvents
            onDidFocus={() => this.componentDidMount()} />
          <StatusBar barStyle='light-content' />
          <View style={styles.userInfo}>
            <FlatList
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
              data={this.state.currentUser}
              scrollEnabled='false'
              renderItem={
                ({ item, index }) => {
                  return (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                      <View style={styles.userPic}>
                        <Image
                          style={styles.profileImage}
                          source={{ uri: item.profilePicture }}
                        />
                        <Text style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: '#fff',
                          paddingTop: 10
                        }}>{item.fName + " " + item.lName}</Text>
                        <Text style={{ color: '#fff', paddingBottom: 5, }}>{item.userName}</Text>
                      </View>
                      <View style={styles.userLocation}>
                        <View style={styles.location}>
                          <Icon name="map-marker" size={18} color={'#fff'} padding={5} />
                          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', padding: 5, }}>Ann Arbor, MI</Text>
                        </View>
                      </View>
                    </View>
                  )
                }
              }
            />
          </View>
          <View style={styles.userActivity}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 5, }}>Favorites:</Text>
            <FlatList
              data={this.state.favorites}
              renderItem={
                ({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => { this.viewBeer(item) }
                    }>
                      <View style={styles.results} >
                        <View style={styles.resultImage}>
                          <Image
                            style={{ height: 75, width: 75, resizeMode: 'contain' }}
                            source={{ uri: item.image }}
                          />
                        </View>
                        <View style={styles.resultInfo}>
                          <View style={styles.resultHeader}>
                            <Text style={styles.beerName}>{item.name}</Text>
                          </View>
                          <View style={styles.resultBody}>
                            <View style={styles.bodyLeft}>
                              <Text style={styles.resultItem}>{item.brewery_name}</Text>
                              <Text style={styles.resultItem}>{item.city}, {item.state}</Text>
                              <Text style={styles.resultItem}>ABV: {item.abv}</Text>
                              <Text style={styles.resultItem}>{item.cat_name}</Text>
                            </View>
                            <View style={styles.bodyRight}>
                              <View style={styles.ratingText}>
                                <Text style={{ fontSize: 18 }}>Rating:</Text>
                              </View>
                              <View style={styles.ratingStars}>
                                <Text style={{ fontSize: 14 }}>{item.rating / item.num_ratings}
                                  <Icon
                                    name="star" size={18} color={'gold'} paddingHorizontal={10}
                                  />
                                  <Text style={{ fontSize: 10 }}>
                                    ({item.num_ratings})
                                </Text>
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }
              }
            />
          </View>
        </View>
      );
    }
  }
}