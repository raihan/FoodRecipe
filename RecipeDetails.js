import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class RecipeDetails extends Component {

  static navigationOptions = {
    title: 'Recipe Details',
  };

  render() {
    const { params } = this.props.navigation.state;
    const item = params.recipeDetail
    return (
      <WebView
        source={{uri: item.source_url}}
        style={{marginTop: 0}}
      />
    );
  }
}
