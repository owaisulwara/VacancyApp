import { createAppContainer ,createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'


import SplashScreen from '../screens/Splash/SplashScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import VacanciesScreen from '../screens/Vacancies/VacanciesScreen';
import VacanciesListScreen from '../screens/VacanciesList/VacanciesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import SearchScreen from '../screens/Search/SearchScreen';
import BookMarkScreen from '../screens/BookMark/BookMark';
import RateUSScreen from '../screens/RateUS/RateUS';
import AboutUSScreen from '../screens/AboutUS/AboutUS';
import ConnectionError from '../components/InternetCheck/ConnectionError';
import DailyQuiz from '../screens/DailyQuiz/DailyQuiz';
import DailyQuizForm from '../screens/DailyQuiz/DailyQuizForm';
import PrivacyScreen from '../screens/Privacy/PrivacyScreen';
import SliderPostScreen from '../screens/SliderPost/SliderPost';


const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Categories: CategoriesScreen,
    Vacancies: VacanciesScreen,
    VacanciesList: VacanciesListScreen,
    Search: SearchScreen,
    BookMark:BookMarkScreen,
    RateUs:RateUSScreen,
    AboutUs:AboutUSScreen,
    DailyQuiz:DailyQuiz,
    DailyQuizForm:DailyQuizForm,
    Privacy:PrivacyScreen,
    SliderPost:SliderPostScreen,
  },
  { 
    defaulfNavigationOptions: ({ navigation }) => ({
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      //   textAlign: 'center',
      //   alignSelf: 'center',
      //   flex: 1,
      // },
      headerStyle:{
        backgroundColor: 'rgb(255, 99, 31)'
      }
    })
  }
); 


const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer,
    backBehavior:'none',
    drawerType:'slide',
    minSwipeDistance:5,
    swipeDistanceThreshold:5,
    swipeEdgeWidth:5,
    swipeVelocityThreshold:10,
  },
);

 
export default AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Splash:SplashScreen,
      App:DrawerStack,
      Error:ConnectionError
    },
    {
      initialRouteName:'Splash'
    }
  )
);

console.disableYellowBox = true;