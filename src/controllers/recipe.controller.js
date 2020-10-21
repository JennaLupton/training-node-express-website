// There is some logic in this module but input validation should also go here

const recipeConnector = require('../connectors/recipe.connector');
// const recipeStepConnector = require('../connectors/recipe-step.connector');

// Formats the posted data before passing to the connector
const createRecipe = async (recipe) => {
  await recipeConnector.createRecipe(recipe);
};

  // const response = await recipeConnector.createRecipe(recipe);
  // const { lastID } = response.data;

  // Recipe instructions are split into their composite steps
  // const recipeSteps = recipe.recipe_steps
    // .split(/[\r\n]+/)
    // .map((p, i) => {
      // return { step_number: i + 1, step_text: p };
    // })
    // .filter((p) => !p.match(/\s*/));
  // await recipeStepConnector.updateRecipeSteps(lastID, recipeSteps);
// };

const deleteRecipe = async (id) => recipeConnector.deleteRecipe(id);

const formatDescription = (description) => {
  return `${description.substring(0, 50)}...`;
};

const formatPreparation = (PreparationTime) => {
  const hours = Math.floor(PreparationTime / 60);
  const minutes = PreparationTime % 60;
  let result = ``;
  if (hours > 0) {
    result = `${hours} hour(s)`;
    if (minutes > 0) {
      result += ` and ${minutes} minute(s)`;
    }
  } else if (minutes > 0) {
      result += `${minutes} minute(s)`
  } 
  return result
};

// Get the recipe data and formats for viewing
const getRecipes = async (searchTerm) =>
  (await recipeConnector.getRecipes(searchTerm)).data.map((recipe) => {
    return { ...recipe, 
      short_description: formatDescription(recipe.short_description), 
      preparation_time: formatPreparation(recipe.preparation_time)};
  });

const getRecipe = async (id) => {
  const recipe = await recipeConnector.getRecipe(id);
  return { recipe: recipe.data };
};

const updateRecipe = async (id, recipe) => recipeConnector.updateRecipe(id, recipe);

module.exports = {
  createRecipe,
  deleteRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
};
