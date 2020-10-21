// There is currently no real logic in this module but input validation should go here

const recipeStepConnector = require('../connectors/recipe-step.connector');

const createRecipeStep = async (recipeId, recipeStep) => {
  await recipeStepConnector.createRecipeStep({recipe_id: recipeId, ...recipeStep});
};

const deleteRecipeStep = async (recipeId, stepId) => {
  await recipeStepConnector.deleteRecipeStep(recipeId, stepId)};

const getRecipeSteps = async (recipeId) =>
  (await recipeStepConnector.getRecipeSteps(recipeId)).data.map((recipeSteps) => {
    return {step_number: recipeSteps.step_number, 
            step_text: recipeSteps.step_text, 
            recipe_step_id: recipeSteps.recipe_step_id};
  });

const getRecipeStep = async (recipeId, stepId) => {
  return recipeStepConnector.getRecipeStep(recipeId, stepId);
};

const updateRecipeStep = async (recipeId, stepId, recipeStep) => {
  await recipeStepConnector.updateRecipeStep(recipeId, stepId, recipeStep)};

module.exports = {
  createRecipeStep,
  deleteRecipeStep,
  getRecipeSteps,
  getRecipeStep,
  updateRecipeStep,
};
