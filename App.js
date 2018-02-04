/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import {
  StackNavigator,
} from 'react-navigation';

import RecipeHome from './RecipeHome';
import RecipeSearchResult from './RecipeSearchResult';
import RecipeDetails from './RecipeDetails';


const App = StackNavigator({
  RecipeHomePage: { screen: RecipeHome },
  RecipeSearchResultPage: { screen: RecipeSearchResult },
  RecipeDetailsPage: { screen: RecipeDetails },
});
export default App;
