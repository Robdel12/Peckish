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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientsInput: '',
      isLoading: false
    };
  }

  searchPressed() {
    this.setState({ isLoading: true });
    this.props.fetchRecipes(this.state.ingredientsInput).then(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <View style={styles.scene}>
        <View style={styles.searchSection}>
          <TextInput style={styles.searchInput}
            returnKeyType="search"
            placeholder="Ingredients (comma delimited)"
            onChangeText={(ingredientsInput) => this.setState({ingredientsInput})}
            onSubmitEditing={() => { this.searchPressed() }}
            value={this.state.ingredientsInput}
          />
        </View>
        <ScrollView style={styles.scrollSection}>
          {!this.state.isLoading && this.props.searchedRecipes.length && this.props.searchedRecipes.map(recipe => {
            return (
              <View key={recipe.id}>
                <Image source={{uri: recipe.image}} style={styles.resultImage} />
                <Text style={styles.resultText}>{recipe.title}</Text>
              </View>
            );
          })}
          {this.state.isLoading ? <Text>Loading...</Text> : null}
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
  searchSection: {
    height: 30,
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5
  },
  searchInput: {
    flex: 1,
  },
  scrollSection: {
    flex: 0.8
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
