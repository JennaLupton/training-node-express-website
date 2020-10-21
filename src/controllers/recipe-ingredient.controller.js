// There is currently no real logic in this module but input validation should go here

const recipeIngredientConnector = require('../connectors/recipe-ingredient.connector');

const createRecipeIngredient = async (recipeId, recipeIngredient) => {
  await recipeIngredientConnector.createRecipeIngredient({
    recipe_id: recipeId, ...recipeIngredient});
};

const deleteRecipeIngredient = async (recipeId, ingredientId) => {
  await recipeIngredientConnector.deleteRecipeIngredient(recipeId, ingredientId)};

const getRecipeIngredients = async (recipeId) =>
  (await recipeIngredientConnector.getRecipeIngredients(recipeId)).data.map(
    (recipeIngredients) => {
      return {name: recipeIngredients.name,
              ingredient_id: recipeIngredients.ingredient_id,
              recipe_ingredient_id: recipeIngredients.recipe_ingredient_id};
  });

const getRecipeIngredient = async (recipeId, ingredientId) => {
  return recipeIngredientConnector.getRecipeIngredient(recipeId, ingredientId)
};

const updateRecipeIngredient = async (recipeId, ingredientId, recipeIngredient) => {
  await recipeIngredientConnector.updateRecipeIngredient(recipeId, ingredientId, recipeIngredient)};

module.exports = {
  createRecipeIngredient,
  deleteRecipeIngredient,
  getRecipeIngredients,
  getRecipeIngredient,
  updateRecipeIngredient,
};