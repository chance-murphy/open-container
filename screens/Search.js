import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { styles } from '../Styles';
import { db } from '../Config';
import firebase from 'firebase';

export class SearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      searchResults: [],
      recentSearches: [],
      // currentUser: firebase.auth().currentUser,
      search: '',
    }
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;

    this.beersRef = db.collection("beers");
    this.beersRef.get().then(queryRef => {
      let newBeers = [];
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
        newBeers.push(newBeer);
      })
      this.setState({ beers: newBeers });
    });

    this.recentSearchesRef = db.collection("users").doc(currentUser.uid).collection("recent_searches");
    this.recentSearchesRef.get().then(queryRef => {
      queryRef.forEach(docRef => {
        let docData = docRef.data();
        this.setState({ recentSearches: docData.searchTerms });
        console.log(this.state.recentSearches);
      })
    });
  }

  handleSearch(text){
    this.setState({ search: text });
    let result = this.searchBeer(text);
    this.setState({ searchResults: result });
  }

  searchBeer(searchTerm){
    let beerList = this.state.beers;
    let result = [];

    for (beer of beerList) {
      if (beer.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
        || beer.brewery_name.toLowerCase().includes(searchTerm.toLowerCase().trim())
        || beer.cat_name.toLowerCase().includes(searchTerm.toLowerCase().trim())) {
        result.push(beer);
      }
    };
    return (result);
  }

  viewBeer(beerToView) {
    this.props.navigation.navigate('BeverageInfo', {
      beer: beerToView,
      searchScreen: this
    });
  }

  updateRecentSearch() {
    let search = this.state.search;
    let recents = this.state.recentSearches;
    let currentUser = firebase.auth().currentUser;

    if (search != '' ) {
      if (recents.length > 9) {
        recents.pop();
        recents.unshift(search);
      } else {
        recents.unshift(search);
      }
      db.collection("users").doc(currentUser.uid)
        .collection("recent_searches").doc("most_recent")
        .set({
          searchTerms: recents,
        })
        .then(() => {
          this.setState({ recentSearches: recents });
        });
    }
  }

  render() {
    if (this.state.recentSearches < 1) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <View style={styles.searchArea}>
            <SearchBar
              platform='ios'
              placeholder="Search..."
              containerStyle={styles.searchBar}
              onChangeText={(value) => this.handleSearch(value)}
              onBlur={(value) => this.updateRecentSearch(value)}
              value={this.state.search}
            />
          </View>
          <View style={styles.previousSearch}>
            <Text style={{ padding: 10 }}>You have no recent searches</Text>
            <Icon name="emoticon-sad-outline" size={50} color={'#efefef'} />
          </View>
        </View>
      )
    } else if (this.state.search === '') {
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <View style={styles.searchArea}>
            <SearchBar
              platform='ios'
              placeholder="Search..."
              containerStyle={styles.searchBar}
              onChangeText={(value) => this.handleSearch(value)}
              onBlur={() => this.updateRecentSearch()}
              value={this.state.search}
            />
          </View>
          <View style={styles.previousSearch}>
            <View style={styles.previousHeader}>
              <Text style={{ fontSize: 24, padding: 5, fontWeight: 'bold' }}>Recent Searches:</Text>
            </View>
            <View style={styles.previousSearchesList}>
              <FlatList
                data={this.state.recentSearches}
                scrollEnabled='false'
                renderItem={
                  ({ item, index }) => {
                    return (
                      <View style={styles.recentSearchItem}>
                        <Text style={{ fontSize: 18, padding: 5 }}>{ item }</Text>
                      </View>
                    );
                  }
                }
              />
            </View>
          </View>
        </View>
      )  
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <View style={styles.searchArea}>
            <SearchBar
              platform='ios'
              placeholder="Search..."
              containerStyle={styles.searchBar}
              onChangeText={(value) => this.handleSearch(value)}
              onBlur={(value) => this.updateRecentSearch(value)}
              value={this.state.search}
            />
          </View>
          <View style={styles.previousSearch}>
            <FlatList
              data={this.state.searchResults}
              renderItem={
                ({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => 
                      { this.viewBeer(item) }
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
                                <Text style={{ fontSize: 14 }}>{ item.rating / item.num_ratings } 
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