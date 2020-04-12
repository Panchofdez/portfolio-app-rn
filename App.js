import React from 'react';
import {Provider} from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import PortfoliosScreen from './src/screens/PortfoliosScreen';
import PortfolioShowScreen from './src/screens/PortfolioShowScreen';
import MyPortfolioScreen from './src/screens/MyPortfolioScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import AuthenticateUserScreen from './src/screens/AuthenticateUserScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';
import AboutFormScreen from './src/screens/AboutFormScreen';
import WorkFormScreen from './src/screens/WorkFormScreen';
import TimelineFormScreen from './src/screens/TimelineFormScreen';
import ProfileFormScreen from './src/screens/ProfileFormScreen';
import CollectionCreateScreen from './src/screens/CollectionCreateScreen';
import CollectionEditScreen from './src/screens/CollectionEditScreen';
import configureStore from './src/store';
import {setNavigator} from './src/navigationRef';
import {Entypo, FontAwesome5} from '@expo/vector-icons';



const store = configureStore();

const headerStyle = {
  title:'', 
  headerStyle:{
    backgroundColor:'#161716'
  }, 
  headerTintColor:'white'
}

const switchNavigator = createSwitchNavigator({
  AuthUser:AuthenticateUserScreen,
  loginFlow:createStackNavigator({
    Signup:{screen:SignupScreen,navigationOptions:{headerShown:false}},
    Signin:{screen:SigninScreen, navigationOptions:{headerShown:false}}
  }),
  mainFlow:createBottomTabNavigator({
    portfoliosFlow:createStackNavigator({
      Portfolios:{screen: PortfoliosScreen, navigationOptions:{headerShown:false}},
      PortfolioShow:{screen:PortfolioShowScreen, navigationOptions:headerStyle},
      Recommendations:{screen:RecommendationsScreen, navigationOptions:headerStyle}
    }, {
            navigationOptions:{
              tabBarIcon:({tintColor})=><Entypo name="home" size={35} color={tintColor}/>
            }
        }

    ),
    Notifications:{
      screen:NotificationsScreen, 
      navigationOptions:{
        tabBarIcon: ({tintColor})=><FontAwesome5 solid name="bell" size={30} color={tintColor}/>
      }
    },
    myPortfolioFlow:createStackNavigator({
      MyPortfolio:{
        screen:MyPortfolioScreen,
        navigationOptions:{headerShown:false}
      },
      Recommendations:{screen:RecommendationsScreen, navigationOptions:headerStyle},
      ProfileForm:{screen:ProfileFormScreen, navigationOptions:headerStyle},
      AboutForm:{screen:AboutFormScreen, navigationOptions:headerStyle},
      WorkForm:{screen:WorkFormScreen, navigationOptions:headerStyle},
      CollectionCreate:{screen:CollectionCreateScreen, navigationOptions:headerStyle},
      CollectionEdit:{screen:CollectionEditScreen, navigationOptions:headerStyle},
      TimelineForm:{screen:TimelineFormScreen, navigationOptions:headerStyle}
    },{navigationOptions:{
          tabBarIcon:({tintColor})=><FontAwesome5 solid name="user" size={30} color={tintColor}/>,

        }
      }
    )
  },{
    tabBarOptions: {
      activeTintColor: '#00ad8e',
      inactiveTintColor:'white',
      showLabel:false,
      style: {
        backgroundColor: '#303330',
      },
    }
  })
})


const App = createAppContainer(switchNavigator);


export default ()=>{
  return(
    <Provider store={store}>
      <App ref={(navigator)=>setNavigator(navigator)}/>
    </Provider>
  )
}