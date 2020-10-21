// This module enables access to the recipe steps data, sending HTTP requests to the API endpoint.
// Axios is used to simplify the HTTP interactions. Very little logic is required but having
// requests performed here, rather than in the controller, allows for easier testing.

const axios = require('axios');

const createRecipeStep = async (recipeStep) => axios.post(`http://localhost:3002/recipes/${recipeStep.recipe_id}/recipe-steps`, recipeStep);

const deleteRecipeStep = async (recipeId, stepId) => axios.delete(`http://localhost:3002/recipes/${recipeId}/recipe-steps/${stepId}`);

const getRecipeSteps = async (recipeId, searchTerm) => {
  const searchUrlPart = searchTerm ? `search=${searchTerm}` : '';
  return axios.get(`http://localhost:3002/recipes/${recipeId}/recipe-steps${searchUrlPart}`);
};

const getRecipeStep = async (recipeId, stepId) => {
  const result = await axios.get(`http://localhost:3002/recipes/${recipeId}/recipe-steps/${stepId}`);
  return result;
};

const updateRecipeStep = async (recipeId, stepId, recipeStep) => {
  return axios.put(`http://localhost:3002/recipes/${recipeId}/recipe-steps/${stepId}`, recipeStep)
};

module.exports = {
  createRecipeStep,
  deleteRecipeStep,
  getRecipeSteps,
  getRecipeStep,
  updateRecipeStep,
};
