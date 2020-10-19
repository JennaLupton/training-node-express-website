// There is currently no real logic in this module but input validation should go here

const recipeIngredientConnector = require('../connectors/recipe-ingredient.connector');

const createRecipeIngredient = async (recipeIngredient) => recipeIngredientConnector.createRecipeIngredient(recipeIngredient);

const deleteRecipeIngredient = async (id) => recipeIngredientConnector.deleteRecipeIngredient(id);

const getRecipeIngredients = async (recipeId) => recipeIngredientConnector.getRecipeIngredients(recipeId);

const getRecipeIngredient = async (id) => recipeIngredientConnector.getRecipeIngredient(id);

module.exports = {
  createRecipeIngredient,
  deleteRecipeIngredient,
  getRecipeIngredients,
  getRecipeIngredient,
};