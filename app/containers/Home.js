import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import {
  MKSpinner,
  MKTextField,
  MKColor,
  getTheme
} from 'react-native-material-kit';
const theme = getTheme();

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  recipeCard(recipe) {
    return (
      <View style={[theme.cardStyle, {flex: 0.8}]} key={recipe.id}>
        <Image source={{uri : recipe.image}} style={theme.cardImageStyle} />
        <Text style={theme.cardTitleStyle}>{recipe.title}</Text>
        <Text style={theme.cardContentStyle}>
          {recipe.title}
        </Text>
      </View>
    );
  }

  startSearch() {
    this.setState({ isLoading: true });
    this.props.fetchRecipes(this.state.ingredientsInput).then(() => {
      this.setState({ isLoading: false });
    });
  }

  setIngredientsInputValue(ingredientsInput) {
    this.setState({ingredientsInput});
  }

  render() {
    return (
      <View style={styles.scene}>
        <View style={styles.searchSection}>
          <MKTextField
            textInputStyle={{color: MKColor.Orange}}
            placeholder="Ingredients (comma delimited)"
            onChangeText={(ingredientsInput) => this.setIngredientsInputValue(ingredientsInput)}
            onSubmitEditing={() => { this.startSearch() }}
            value={this.state.ingredientsInput}
          />
        </View>
        <ScrollView style={styles.scrollSection}>
          {!this.state.isLoading && this.props.searchedRecipes.length && this.props.searchedRecipes.map(recipe => {
            return this.recipeCard(recipe);
          })}
          {this.state.isLoading ? <MKSpinner style={styles.loadingSpinner} /> : null}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20
  },
  searchInput: {
    padding: 5
  },
  scrollSection: {
    flex: 0.8
  },
  loadingSpinner: {
    height: 60,
    width: 60,
    marginTop: 100,
    alignSelf: 'center'
  },
  resultImage: {
    height: 200
  },
  resultText: {
    backgroundColor: 'black',
    color: 'white',
    height: 30,
  }
});

function mapStateToProps(state) {
  return {
    searchedRecipes: state.searchedRecipes
  }
}

export default connect(mapStateToProps)(Home)
