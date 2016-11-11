import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  Thumbnail,
  InputGroup,
  Input,
  Icon,
  Spinner,
} from 'native-base';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  recipeCard(recipe) {
    return (
      <Card style={styles.cardContainer} key={recipe.id}>
        <CardItem>
          <Text>{recipe.title}</Text>
        </CardItem>
        <CardItem>
          <Image style={{ resizeMode: 'cover' }} source={{uri: recipe.image}} />
        </CardItem>
        <CardItem>
          <Text>See Recipe</Text>
        </CardItem>
     </Card>
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
      <Container>
        <Header>
          <Title>Peckish</Title>
        </Header>
        <Content>
          <InputGroup>
            <Icon name='ios-search' style={{color:'#00C497'}}/>
            <Input placeholder='bacon, cheese, eggs'
              onChangeText={(inputValue) => { this.setIngredientsInputValue(inputValue) }}
              onSubmitEditing={() => { this.startSearch() }}
              value={this.state.ingredientsInput}
            />
          </InputGroup>
          {!this.state.isLoading && this.props.searchedRecipes.length && this.props.searchedRecipes.map(recipe => {
            return this.recipeCard(recipe);
          })}
          {this.state.isLoading ? <Spinner style={styles.loadingSpinner} color="#00C497" /> : null}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10
  }
});

function mapStateToProps(state) {
  return {
    searchedRecipes: state.searchedRecipes
  }
}

export default connect(mapStateToProps)(Home)
