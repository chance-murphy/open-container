import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image, StatusBar, Linking, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../Styles';
import { db } from '../Config';
import firebase from 'firebase';

export class BeverageScreen extends React.Component {
  constructor(props) {
    super(props);

    this.beerToView = this.props.navigation.getParam('beer', undefined);
    this.mainScreen = this.props.navigation.getParam('mainScreen');

    let beer = [];
    beer.push(this.beerToView);
    
    this.state = {
      beer: beer,
      userRating: 0,
    }

  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;
    this.ratingRef = db.collection("users").doc(currentUser.uid)
                        .collection("beer_ratings").doc(beer.beer_id);
    this.ratingRef.get().then(queryRef => {
      let rating = 0;
      queryRef.forEach(docRef => {
        let docData = docRef.data();
        rating = docData.rating
      })
      this.setState({ 
        userRating: rating
      });
      console.log(this.state.userRating)
    });
  }

  addToFavorites(beer) {
    let currentUser = firebase.auth().currentUser;
    db.collection("users").doc(currentUser.uid)
      .collection("favorites").doc(beer.beer_id)
      .set({
        name: beer.name,
        rating: beer.rating,
        num_ratings: beer.num_ratings,
        image: beer.image,
        beer_id: beer.beer_id,
        brewery_name: beer.brewery_name,
        brewery_id: beer.brewery_id,
        abv: beer.abv,
        srm: beer.srm,
        availability: beer.availability,
        cat_name: beer.cat_name,
        cat_id: beer.cat_id,
        descript: beer.descript,
        website: beer.website,
        street: beer.street,
        city: beer.city,
        state: beer.state,
        country: beer.country,
        coordinates: beer.coordinates,
      });
    // alert(beer.name + " was added to your favorites")
  }

  handleRating(beer, rating) {
    let currentUser = firebase.auth().currentUser;
    db.collection("users").doc(currentUser.uid)
    .collection("beer_ratings").doc(beer.beer_id)
    .set({
      rating: rating,
    })
    .then (() => {
      this.setState ({
        userRating: rating
      })
    })
    db.collection("beers").doc(beer.beer_id)
    .update({
      num_ratings: beer.num_ratings + 1,
      rating: beer.rating + rating,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.beer}>
          <View style={styles.beerPic}>
            <Image
              style={styles.profileImage}
              source={{ uri: this.beerToView.image }}
            />
            <Text style={{ 
              fontSize: 24, 
              fontWeight: 'bold', 
              color: '#fff', 
              paddingTop: 10 }}>{this.beerToView.name}</Text>
            <Text style={{ color: '#fff', paddingBottom: 5, }}>
              <Text style={{ fontWeight: 'bold' }}>ABV:</Text> 
              {this.beerToView.abv}</Text>
          </View>
          <View style={styles.beerBrewery}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{this.beerToView.brewery_name}</Text>
            </View>
            <View style={styles.beerLocation}>
              <Icon name="map-marker" size={14} color={'#fff'} padding={5} />
              <Text style={{ 
                fontSize: 14, 
                color: '#fff', 
                padding: 5,
              }}>{this.beerToView.city}, {this.beerToView.state}</Text>
            </View>
          </View>
        </View>
        <View style={styles.beerInfo}>
          <FlatList
            data={this.state.beer}
            renderItem={
              ({ item, index }) => {
                return (
                  <View>
                    <View style={styles.beerInteractions}>
                      <View style={styles.favButton}>
                        <Button
                          buttonStyle={styles.addFavorite}
                          type="solid"
                          title="+ Add To Favorites"
                          onPress={() => this.addToFavorites(item)}
                        />
                      </View>
                      <View style={styles.userRating}>
                        <Text style={{ fontSize: 24, paddingRight: 10 }}>Your Rating:</Text>
                        <Icon
                          name="star-outline" size={30} color={'gold'}
                          onPress={() => this.handleRating(item, 1)}
                        />
                        <Icon
                          name="star-outline" size={30} color={'gold'}
                          onPress={() => this.handleRating(item, 2)}
                        />
                        <Icon
                          name="star-outline" size={30} color={'gold'}
                          onPress={() => this.handleRating(item, 3)}
                        />
                        <Icon
                          name="star-outline" size={30} color={'gold'}
                          onPress={() => this.handleRating(item, 4)}
                        />
                        <Icon
                          name="star-outline" size={30} color={'gold'}
                          onPress={() => this.handleRating(item, 5)}
                        />
                      </View>
                      <View style={{ paddingBottom: 10 }}>
                        <Text style={{ fontSize: 18 }}>Average Rating: { item.rating / item.num_ratings }
                          <Icon
                            name="star" size={24} color={'gold'} paddingHorizontal={10}
                          />
                          <Text style={{ fontSize: 14 }}>({item.num_ratings})</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.beerCategory}>
                      <Text style={styles.categoryHeader}>Beer Type:</Text>
                      <Text style={styles.inLine}>{item.cat_name}</Text>
                    </View>
                    <View style={styles.beerCategory}>
                      <Text style={styles.descriptionHeader}>Availability:</Text>
                      <Text style={styles.inLineSmall}>{item.availability}</Text>
                    </View>
                    <View style={styles.beerDescription}>
                      <Text style={styles.descriptionHeader}>About:</Text>
                      <Text style={styles.nextLine}>{item.descript}</Text>
                    </View>
                    <View style={styles.beerDescription}>
                      <Text style={styles.descriptionHeader}>Brewery Address:</Text>
                      <Text style={styles.address}>{item.street}</Text>
                      <Text style={styles.address}>{item.city}, {item.state}</Text>
                      <Text style={styles.address}>{item.country}</Text>
                    </View>
                    <View style={styles.beerWebsite}>
                      <Text style={styles.descriptionHeader}>Website:</Text>
                      <Text style={styles.website}
                        onPress={() => Linking.openURL(item.website)}>{item.website}</Text>
                    </View>
                  </View>
                )
              }
            }
          />
        </View>
      </View>
    );
  }
}