'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
      encoding: 'json',
      page: pageNumber,
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
 return 'https://food2fork.com/api/search?' + querystring + '&key=f0926d75d6dcf4f2b24047c79ec1aba1';
}

export default class SearchPage extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      searchString: 'chicken',
      isLoading: false,
      message: '',
    };
  }

  _onSearchTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
  };

  _executeQuery = (query) => {
  console.log(query);
  this.setState({ isLoading: true });
};

_handleResponse = (response) => {
  this.setState({ isLoading: false , message: '' });
  if (response.recipes.length > 0) {
      console.log('JSON.stringify(response) = ' + JSON.stringify(response));
      this.props.navigation.navigate(
        'RecipeSearchResultPage', {listings: response.recipes});
  } else {
    this.setState({ message: 'Recipe not recognized; please try again.'});
  }
};

_onSearchPressed = () => {
  const query = urlForQueryAndPage('q', this.state.searchString, 1);
  this._executeQuery(query);
  fetch(query)
  .then(response => response.json())
  .then(json => this._handleResponse(json))
  .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
};

  static navigationOptions = {
    title: 'Property Finder',
  };

  render() {
    console.log('SearchPage.render');
    const { params } = this.props.navigation.state;
    const spinner = this.state.isLoading ? <ActivityIndicator size='large'/> : null;
    return (
      <View style={styles.container}>
        <Image source={require('./Resources/recipe.jpg')} style={styles.image}/>
        <Text style={styles.description}>
          Search for Recipe!
        </Text>
        <Text style={styles.description}>
          Search by food name or ingredients
        </Text>
        <View style={styles.flowRight}>
        <TextInput
          style={styles.searchInput}
          value={this.state.searchString}
          onChange={this._onSearchTextChanged}
          placeholder='Search via name or postcode'/>
        <Button onPress={this._onSearchPressed} color='#48BBEC' title='Go'/>
        </View>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    flex: 1,
    padding: 30,
    marginTop: 0,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch',
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flexGrow: 1,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC',
},
image: {
  marginTop: 10,
  marginBottom: 10,
  width: 217,
  height: 138,
},
});
