import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  
// General Styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageHeader: {
    fontSize: 32,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIcon: {
    height: 50,
    resizeMode: 'contain',
  },
  profileImage: { 
    height: 100, 
    width: 100,
    resizeMode: 'contain', 
    borderRadius: 25, 
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
},

  //Splash Screen Styles
  logInHeader: {
    flex: .35,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logInTagline: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
  },
  appHeader: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  appTagline: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
    color: '#fff',
  },
  logIn: {
    flex: .225,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logInText: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fefefe",
    fontSize: 20,
    height: 40,
    width: 250,
    margin: 5,
    paddingHorizontal: 10,
  },
  logInButtons: {
    flexDirection: 'row'
  },
  logInSignUp: {
    height: 40,
    width: 120,
    margin: 5,
    backgroundColor: '#fff',
  },
  logInGoogle: {
    flex: .1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleLogIn: {
    height: 40,
    width: 250,
    margin: 5,
    backgroundColor: '#007AFF',
    borderWidth: 1,
    borderColor: '#fff'
  },
  logInEmpty: {
    flex: .125,
    justifyContent: 'flex-end',
  },

  // Sign Up Screen Styles

  signUpHeader: {
    flex: .25,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signUpTagLine: {
    flex: .15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
  },
  signUpForm: {
    flex: .45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    flex: .15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  signUpText: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fefefe",
    fontSize: 20,
    height: 40,
    width: 250,
    margin: 5,
    paddingHorizontal: 10,
  },

  //Search Page Styles

  searchArea: {
    flex: .1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  searchBar: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderBottomColor: "#efefef",
  },
  previousSearch: {
    flex: .9,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousHeader: {
    flex: .25,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  previousSearchesList: {
    flex: .75,
  },
  recentSearchItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  results: {
    flex: 1,
    width: 400,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  resultImage: {
    flex: .3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfo: {
    flex: .7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultHeader: {
    flex: .25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  beerName: {
    flex: 1,
    fontSize: 18, 
    fontWeight: 'bold',
    marginLeft: 5,
  },
  resultBody: {
    flex: .75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyLeft: {
    flex: .5,
  },
  resultItem: {
    marginLeft: 5,
    marginVertical: 1,
  },
  bodyRight: {
    flex: .5,
    flexDirection: 'column',
  },
  ratingText: {
    flex: .5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingStars: {
    flex: .5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },

  // Notification Screen Style

  // Profile Screen Style
  userInfo: {
    flex: .35,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#007AFF',
    borderBottomWidth: 1, 
    borderBottomColor: '#efefef',
  },
  userPic: {
    flex: .75,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  userLocation: {
    flex: .25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  location: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  userActivity: {
    flex: .65,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Beverage Info Style

  beer: {
    flex: .35,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#007AFF',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  beerPic: {
    flex: .75,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  beerBrewery: {
    flex: .25,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  beerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  beerInfo: {
    flex: .65,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  beerInteractions: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  favButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  addFavorite: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF'
  },
  userRating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },






  beerCategory: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  beerWebsite: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 10,
  },
  inLine: {
    fontSize: 18,
    paddingLeft: 5,
    paddingTop: 10,
  },
  inLineSmall: {
    fontSize: 18,
    paddingLeft: 5,
    paddingTop: 10,
  },
  website: {
    fontSize: 18,
    paddingLeft: 5,
    paddingTop: 10,
    color: '#007AFF',
  },
  beerDescription: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 10,
  },
  nextLine: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  address: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 1,
  },
});