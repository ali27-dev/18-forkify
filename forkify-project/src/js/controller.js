const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const showRecipe = async function () {
  // 1) Loading recpie
  try {
    const res = await fetch(
      'https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e897b'
      // 'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886'
    );

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}`);

    let recipe = data.data.recipe;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      SourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);

    // 2) Rendering recipe

    const markup = `

    `;
  } catch (error) {
    alert(error);
  }
};

showRecipe();
