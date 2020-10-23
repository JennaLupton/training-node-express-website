/* eslint-disable no-case-declarations */

const express = require('express');
const recipeIngredientController = require('../controllers/recipe-ingredient.controller');
const recipeStepController = require('../controllers/recipe-step.controller');
const recipeController = require('../controllers/recipe.controller');
const { CustomException, NotFoundException } = require('../utils/errors');
const { jsonify } = require('../utils/jsonify');

const router = express.Router();

// Renders the create page from the view template
router.get('/create', async (req, res, next) => {
  try {
    res.render('create');
  } catch (err) {
      next(err);
    }
});

// Accepts the data submitted from the create page and calls the controller to persist it
router.post('/create', async (req, res, next) => {
  try {
    await recipeController.createRecipe(req.body);
    res.redirect('/recipes'); // Redirect to the list of recipes upon successful recipe creation
  } catch (err) {
      next(new CustomException('Unable to create recipe', err));
    }
});

// Renders the create step page from the view template
router.get('/:id/recipe-steps/create', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    res.render('create-step', recipe);
  } catch (err) {
      next(err);
    }
});

// Accepts the data submitted from the create step page and calls the controller to persist it
router.post('/:id/recipe-steps/create', async (req, res, next) => {
  try {
    await recipeStepController.createRecipeStep(req.params.id, req.body);
    // Redirect to the recipe view upon successful step creation
    res.redirect(`/recipes/${req.params.id}`);
  } catch (err) {
      next(new CustomException('Unable to create recipe step', err));
    }
});

// Renders the create ingredient page from the view template
router.get('/:id/recipe-ingredients/create', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    res.render('create-ingredient', recipe);
  } catch (err) {
      next(err);
    }
});

// Accepts the data submitted from the create ingredient page and calls the controller to persist it
router.post('/:id/recipe-ingredients/create', async (req, res, next) => {
  try {
    await recipeIngredientController.createRecipeIngredient(req.params.id, req.body);
    // Redirect to the recipe view upon successful ingredient creation
    res.redirect(`/recipes/${req.params.id}`);
  } catch (err) {
      next(new CustomException('Unable to create recipe ingredient', err));
    }
});

// Renders the delete page from the view template
router.get('/:id/delete', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    res.render('delete', recipe);
  } catch (err) {
      next(err);
    }
});

// Calls the controller to delete the recipe corresponding to the ID in the URL
router.post('/:id/delete', async (req, res, next) => {
  try {
    switch (req.accepts(['html', 'json'])) {
      case 'html':
        await recipeController.deleteRecipe(req.params.id);
        res.redirect('/recipes'); // Redirect to the list of recipes upon successful recipe deletion
        break;
      case 'json':
        // Respond with JSON
        await recipeController.deleteRecipe(req.params.id);
        res.json({});
        break;
      default:
        res.status(400).send('Bad Request');
    };
  } catch (err) {
      next(new CustomException('Unable to delete recipe', err));
    }
});

// Renders the delete step page from the view template
router.get('/:id/recipe-steps/:stepId/delete', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    const recipeStep = await recipeStepController.getRecipeStep(req.params.id, req.params.stepId);
    if (!recipeStep) {
      throw new NotFoundException('Recipe step not found');
    }
    res.render('delete-step', {...recipe, recipe_step: recipeStep.data});
  } catch (err) {
      next(err);
    }
});

// Calls the controller to delete the recipe step corresponding to the ID in the URL
router.post('/:id/recipe-steps/:stepId/delete', async (req, res, next) => {
  try {
    switch (req.accepts(['html', 'json'])) {
      case 'html':
        await recipeStepController.deleteRecipeStep(req.params.id, req.params.stepId);
        res.redirect(`/recipes/${req.params.id}`); // Redirect to the recipe view upon successful step deletion
        break;
      case 'json':
        // Respond with JSON
        await recipeStepController.deleteRecipeStep(req.params.id, req.params.stepId);
        res.json({});
        break;
      default:
        res.status(400).send('Bad Request');
    };
  } catch (err) {
      next(new CustomException('Unable to delete recipe step', err));
    }
});

// Renders the delete ingredient page from the view template
router.get('/:id/recipe-ingredients/:ingredientId/delete', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    const recipeIngredient = await recipeIngredientController.getRecipeIngredient(
      req.params.id, req.params.ingredientId);
    if (!recipeIngredient) {
      throw new NotFoundException('Recipe ingredient not found');
    }
    res.render('delete-ingredient', {...recipe, recipe_ingredient: recipeIngredient.data});
  } catch (err) {
      next(err);
    }
});

// Calls the controller to delete the recipe ingredient corresponding to the ID in the URL
router.post('/:id/recipe-ingredients/:ingredientId/delete', async (req, res, next) => {
  try {
    switch (req.accepts(['html', 'json'])) {
      case 'html':
        await recipeIngredientController.deleteRecipeIngredient(
          req.params.id, req.params.ingredientId);
        res.redirect(`/recipes/${req.params.id}`); // Redirect to the recipe view upon successful ingredient deletion
        break;
      case 'json':
        // Respond with JSON
        await recipeIngredientController.deleteRecipeIngredient(
          req.params.id, req.params.ingredientId);
        res.json({});
        break;
      default:
        res.status(400).send('Bad Request');
    };
  } catch (err) {
      next(new CustomException('Unable to delete recipe ingredient', err));
    }
});

// Renders the index page from the template with the data filtered by the search query parameter
router.get('/', async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const result = await recipeController.getRecipes(searchTerm);
    res.status(200).render('index', { recipes: result });
  } catch (err) {
      next(new CustomException('Unable to get recipes', err));
    }
});

// Gets a recipe by the ID supplied in the URL and renders the view page
router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    const recipeSteps = await recipeStepController.getRecipeSteps(req.params.id);
    if (!recipeSteps) {
      throw new NotFoundException('Recipe steps not found');
    }
    const recipeIngredients = await recipeIngredientController.getRecipeIngredients(req.params.id);
    if (!recipeIngredients) {
      throw new NotFoundException('Recipe ingredients not found');
    }
    res.render('view', {...recipe, 
      recipe_steps: recipeSteps, recipe_ingredients: recipeIngredients});
  } catch (err) {
      next(err);
    }
});

// Gets a recipe by the ID supplied in the URL and renders the edit page
router.get('/:id/edit', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    res.render('edit', recipe);
  } catch (err) {
      next(err);
    }
});

// Accepts the data submitted from the edit page and calls the controller to persist it
router.post('/:id/edit', async (req, res, next) => {
  try {
    await recipeController.updateRecipe(req.params.id, req.body);
    res.redirect(`/recipes/${req.params.id}`); // Redirect to the list of recipes upon successful recipe editing
  } catch (err) {
      next(new CustomException('Unable to update recipe', err));
    }
});

// Gets a step by the ID supplied in the URL and renders the edit step page
router.get('/:id/recipe-steps/:stepId/edit', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    const recipeStep = await recipeStepController.getRecipeStep(req.params.id, req.params.stepId);
    if (!recipeStep) {
      throw new NotFoundException('Recipe step not found');
    }
    res.render('edit-step', {...recipe, recipe_step: recipeStep.data });
  } catch (err) {
      next(err);
    }
});

// Accepts the data submitted from the edit step page and calls the controller to persist it
router.post('/:id/recipe-steps/:stepId/edit', async (req, res, next) => {
  try {
    switch (req.accepts(['html', 'json'])) {
      case 'html':
        await recipeStepController.updateRecipeStep(req.params.id, req.params.stepId, req.body);
        res.redirect(`/recipes/${req.params.id}`); // Redirect to the recipe view upon successful step editing
        break;
      case 'json':
        // Respond with JSON
        const recipeStep = await recipeStepController.getRecipeStep(
          req.params.id, req.params.stepId);
        if (!recipeStep) {
          throw new NotFoundException('Recipe step not found');
        }
        await recipeStepController.updateRecipeStep(
          req.params.id, req.params.stepId, jsonify(JSON.parse(req.body.newStep)));
        res.json({});
        break;
      default:
        res.status(400).send('Bad Request');
    };
  } catch (err) {
      next(new CustomException('Unable to update recipe step', err));
    }
});

// Gets an ingredient by the ID supplied in the URL and renders the edit ingredient page
router.get('/:id/recipe-ingredients/:ingredientId/edit', async (req, res, next) => {
  try {
    const recipe = await recipeController.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    const recipeIngredient = await recipeIngredientController.getRecipeIngredient(
      req.params.id, req.params.ingredientId);
    if (!recipeIngredient) {
      throw new NotFoundException('Recipe ingredient not found');
    }
    res.render('edit-ingredient', {...recipe, recipe_ingredient: recipeIngredient.data });
  } catch (err) {
      next(err);
    }
});

// Accepts the data submitted from the edit ingredient page and calls the controller to persist it
router.post('/:id/recipe-ingredients/:ingredientId/edit', async (req, res, next) => {
  try {
    await recipeIngredientController.updateRecipeIngredient(
      req.params.id, req.params.ingredientId, req.body);
    res.redirect(`/recipes/${req.params.id}`); // Redirect to the recipe view upon successful ingredient editing
  } catch (err) {
      next(new CustomException('Unable to update recipe ingredient', err));
    }
});

module.exports = router;
