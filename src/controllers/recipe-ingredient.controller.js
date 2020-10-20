// There is currently no real logic in this module but input validation should go here

const recipeIngredientConnector = require('../connectors/recipe-ingredient.connector');

const createRecipeIngredient = async (recipeId, recipeIngredient) => {
  await recipeIngredientConnector.createRecipeIngredient({
    recipe_id: recipeId, ...recipeIngredient});
};

const deleteRecipeIngredient = async (recipeId, ingredientId) => {
  return recipeIngredientConnector.deleteRecipeIngredient(recipeId, ingredientId)};

const getRecipeIngredients = async (recipeId) =>
  (await recipeIngredientConnector.getRecipeIngredients(recipeId)).data.map(
    (recipeIngredients) => {
      return {name: recipeIngredients.name};
  });

const getRecipeIngredient = async (recipeId, ingredientId) => {
  return recipeIngredientConnector.getRecipeIngredient(recipeId, ingredientId)};

const updateRecipeIngredients = async (recipeId, recipeIngredient) => {
  return recipeIngredientConnector.updateRecipeIngredients(recipeId, recipeIngredient)};

module.exports = {
  createRecipeIngredient,
  deleteRecipeIngredient,
  getRecipeIngredients,
  getRecipeIngredient,
  updateRecipeIngredients,
};