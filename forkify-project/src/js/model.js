import { async } from 'regenerator-runtime'; // Importing regenerator-runtime for async/await support
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
// import { search } from 'core-js/fn/symbol';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1, // Current page of search results
    resultsPerPage: RES_PER_PAGE, // Number of results per page
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const recipe = data.data.recipe;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.err(`${err} 💥💥💥`);
    throw err; // Rethrow the error to be handled by the controller
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    // const recipes = data.data.recipes;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err; // Rethrow the error to be handled by the controller
  }
};

loadSearchResults('pizza');

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // newQt = oldQt * newServings / oldServings
    ing.quantity = (ing.qunatity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings; // Update the servings in the recipe state
};
