import * as types from './types';
import Api from '../lib/api';

export function fetchRecipes(ingredients) {
  return (dispatch, getState) => {
    let params = [
      `ingredients=${encodeURIComponent(ingredients)}`,
      'fillIngredients=false',
      'limitLicense=false',
      'number=25',
      'ranking=1'
    ].join('&');

    return Api.get(`/recipes/findByIngredients?${params}`).then((data) => {
      dispatch(setSearchedRecipes({recipes: data}));
    });
  };
}

export function setSearchedRecipes({ recipes }) {
  return {
    type: types.SET_SEARCHED_RECIPES,
    recipes
  }
}
