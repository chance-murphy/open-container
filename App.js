
//General Imports
import React from 'react';
import { Alert } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from './node_modules/react-navigation-stack';
//Imports for Stack Navigation
import { loadingScreen } from './screens/AppLoading';
import { SplashScreen } from "./screens/LogIn";
import { SignUpScreen } from './screens/SignUp';
import { BeverageScreen } from './screens/BeverageInfo';
import { ResultsScreen } from './screens/SearchResults';
// Imports for Tab Navigation
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen } from './screens/Activity';
import { SearchScreen } from './screens/Search';
import { ProfileScreen } from './screens/Profile';
import { NotificationScreen } from './screens/Notifcations';
// Handle Logout
import firebase from 'firebase';


console.disableYellowBox = true; 

const LoadNavigator = createStackNavigator(
  {
    Home: {
      screen: loadingScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#007AFF',
          borderBottomWidth: 0,
        },
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const StackNavigator = createStackNavigator(
  {
    LogIn: {
      screen: SplashScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#007AFF',
          borderBottomWidth: 0,
        },
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        headerTitle: 'Create Account',
        headerStyle: {
          backgroundColor: '#007AFF',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
      },
    },
  },
);

const SearchNavigator = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        headerTitle: 'Search',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          backgroundColor: '#007AFF',
        },
      },
    },
    // SearchResults: {
    //   screen: ResultsScreen,
    //   navigationOptions: {
    //     headerTitle: 'Search Results',
    //     headerTitleStyle: {
    //       color: '#fff',
    //     },
    //     headerStyle: {
    //       backgroundColor: '#007AFF',
    //     },
    //   },
    // },
    BeverageInfo: {
      screen: BeverageScreen,
      navigationOptions: {
        headerTitle: 'Beverage Info',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          backgroundColor: '#007AFF',
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
      },
    },
  }
);

const ActivityNavigator = createStackNavigator(
  {
    Activity: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'Activity',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          backgroundColor: '#007AFF',
        },
      },
    },
  }
);

const NotificationNavigator = createStackNavigator(
  {
    Notifications: {
      screen: NotificationScreen,
      navigationOptions: {
        headerTitle: 'Notifications',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          backgroundColor: '#007AFF',
        },
      },
    },
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerTitle: 'Profile',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          backgroundColor: '#007AFF',
          borderBottomWidth: 0,
        },
        headerRight: 
        <Icon 
        name="logout-variant" 
        color='#fff'
        size={28}
        style={{ paddingRight: 30 }}
        onPress={() => 
          Alert
          .alert('Log Out?', 'Are you sure you want to log out of Open Container?',
        [
          {
            text: 'No',
            style: 'default'
          },
          {
            text: 'Yes',
            onPress: () => firebase.auth().signOut(),
            style: 'cancel'
          }
        ])}
        />
      },
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Activity: {
      screen: ActivityNavigator,
      navigationOptions: {
        tabBarLabel: 'Activity',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={28} color={tintColor} />
        ),
        //tabBarOptions: { activeTintColor: '#d81226', }
      },
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="magnify" size={28} color={tintColor} />
        ),
        //tabBarOptions: { activeTintColor: '#d81226', }
      },
    },
    Notifications: {
      screen: NotificationNavigator,
      navigationOptions: {
        tabBarLabel: 'Notifcations',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bell" size={26} color={tintColor} />
        ),
        //tabBarOptions: { activeTintColor: '#d81226', }
      },
    }, 
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="account" size={30} color={tintColor} />
        ),
        //tabBarOptions: { activeTintColor: '#d81226', }
      },
    }
  },
)

const App = createSwitchNavigator({
  Load: {
    screen: LoadNavigator,
  },
  Auth: {
    screen: StackNavigator,
  },
  App: {
    screen: TabNavigator,
  },
});

export default createAppContainer(App);
