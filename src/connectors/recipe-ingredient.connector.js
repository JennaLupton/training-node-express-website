// This module enables access to the recipe ingredients data,
// Sending HTTP requests to the API endpoint.
// Axios is used to simplify the HTTP interactions. Very little logic is required but having
// requests performed here, rather than in the controller, allows for easier testing.

const axios = require('axios');

const createRecipeIngredient = async (recipeIngredient) => axios.post(`http://localhost:3002/recipes/${recipeIngredient.recipe_id}/recipe-ingredients`, recipeIngredient);

const deleteRecipeIngredient = async (recipeId, ingredientId) => axios.delete(`http://localhost:3002/recipes/${recipeId}/recipe-ingredients/${ingredientId}`);

const getRecipeIngredients = async (recipeId, searchTerm) => {
  const searchUrlPart = searchTerm ? `search=${searchTerm}` : '';
  return axios.get(`http://localhost:3002/recipes/${recipeId}/recipe-ingredients${searchUrlPart}`);
};

const getRecipeIngredient = async (recipeId, ingredientId) => axios.get(`http://localhost:3002/recipes/${recipeId}/recipe-ingredients/${ingredientId}`);

const updateRecipeIngredients = async (recipeId, recipeIngredient) => {
  return axios.put(`http://localhost:3002/recipes/${recipeId}/recipe-ingredients`, recipeIngredient)
};

module.exports = {
  createRecipeIngredient,
  deleteRecipeIngredient,
  getRecipeIngredients,
  getRecipeIngredient,
  updateRecipeIngredients,
};