import * as model from './model.js'; // Importing the model
import recipeView from './views/recipeView.js';
import resultsView from './views/resultView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
// import Fraction from 'fractional'; // Importing Fraction for handling fractions
// console.log(Fraction);

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    recipeView.renderSpinner();

    // 1) loading recipe
    await model.loadRecipe(id);

    // 2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get query from view
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results

    await model.loadSearchResults(query);
    // 3) Render results
    // resultView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(2));
    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);

    // console.log(model.state.search.results);
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
