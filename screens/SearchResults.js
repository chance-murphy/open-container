import React from 'react';
import { View, Text, Image, TextInput, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../Styles';
import { db } from '../Config';

export class ResultsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.beerList = this.props.navigation.getParam('beerList', undefined);
    this.searchTerm = this.props.navigation.getParam('searchTerm', undefined);
    this.searchResults = this.props.navigation.getParam('searchResults', undefined);
    this.mainScreen = this.props.navigation.getParam('mainScreen');
    
    this.state = {
      search: this.mainScreen.state.search,
      searchResults: this.searchResults,
    }
  }

  // componentDidMount() {
  //   this.forceUpdate();
  // }

  search(searchTerm) {
    // let searchTerm = this.state.search;
    let result = this.mainScreen.searchBeer(searchTerm);
    // console.log(result)
    console.log(searchTerm)
    db.collection("recent_searches").doc("search01").set({
      searchTerm: searchTerm.trim(),
    })
      .then(() => {
        this.setState({ searchResults: result });
        console.log(this.state.searchResults);
        // this.props.navigation.navigate('SearchResults', {
        //   beerList: this.state.beers,
        //   searchTerm: searchTerm,
        //   searchResults: result,
        //   mainScreen: this,
        // });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <SearchBar
            platform='ios'
            placeholder="Search..."
            style={styles.searchBar}
            onChangeText={(value) => {
              this.setState({ search: value }),
                this.search(this.state.search),
                console.log(this.state.search)
            }}
            value={this.state.search}
          />
          {/* <TextInput
            style={styles.searchText}
            onChangeText={(value) => { this.setState({ search: value }), console.log(this.state.search) }}
            value={this.state.search}
          />
          <Button
            buttonStyle={styles.searchButton}
            title="Search"
            onPress={
              () => this.search(this.state.search)
            }
          /> */}
        </View>
        <View style={styles.previousSearch}>
          <FlatList
            data={this.state.searchResults}
            renderItem={
              ({ item }) => {
                return (
                  <View style={styles.results}>
                    <View style={styles.resultImage}>
                      <Image
                        style={{ height: 100, width: 100, resizeMode: 'contain' }}
                        source={require('../assets/unicorn.png')}
                      />
                    </View>
                    <View style={styles.resultInfo}>
                      <View style={styles.resultHeader}>
                        <Text style={styles.beerName}>{item.name}</Text>
                        {/* <Text style={styles.beerRating}>Rating</Text> */}
                      </View>
                      <View style={styles.resultBody}>
                        <Text>{item.brewery_name}</Text>
                      </View>
                    </View>
                  </View>
                );
              }
            }
          />
          {/* <Text style={{ padding: 10 }}>Your search turned up no results</Text>
          <Icon name="emoticon-sad-outline" size={50} color={'#efefef'} /> */}
        </View>
      </View>
    );
  }
}