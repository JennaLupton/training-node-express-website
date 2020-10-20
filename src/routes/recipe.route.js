const express = require('express');
const recipeIngredientController = require('../controllers/recipe-ingredient.controller');
const recipeStepController = require('../controllers/recipe-step.controller');
const recipeController = require('../controllers/recipe.controller');
const { CustomException, NotFoundException } = require('../utils/errors');

const router = express.Router();

// Renders the create page from the view template
router.get('/create', async (req, res) => {
  res.render('create');
});

// Accepts the data submitted from the create page and calls the controller to persist it
router.post('/create', async (req, res, next) => {
  try {
    await recipeController.createRecipe(req.body);
    res.redirect('/recipes'); // Redirect to the list of recipes upon successful creation
  } catch (err) {
    next(new CustomException('Unable to create recipe', err));
  }
});

// Renders the create step page from the view template
router.get('/:id/recipe-steps/create', async (req, res) => {
  res.render('create-step');
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
router.get('/:id/recipe-ingredients/create', async (req, res) => {
  res.render('create-ingredient');
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
    await recipeController.deleteRecipe(req.params.id);
    res.redirect('/recipes'); // Redirect to the list of recipes upon successful deletion
  } catch (err) {
    next(new CustomException('Unable to delete recipe', err));
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
    const recipeSteps = await recipeStepController.getRecipeSteps(req.params.id);
    if (!recipeSteps) {
      throw new NotFoundException('Recipe steps not found');
    }
    const recipeIngredients = await recipeIngredientController.getRecipeIngredients(req.params.id);
    if (!recipeIngredients) {
      throw new NotFoundException('Recipe ingredients not found');
    }
    res.render('edit', {...recipe,
       recipe_steps: recipeSteps, recipe_ingredients: recipeIngredients});
  } catch (err) {
    next(err);
  }
});

// Accepts the data submitted from the edit page and calls the controller to persist it
router.post('/:id/edit', async (req, res, next) => {
  try {
    await recipeController.updateRecipe(req.params.id, req.body);
    res.redirect('/recipes'); // Redirect to the list of recipes upon successful creation
  } catch (err) {
    next(new CustomException('Unable to update recipe', err));
  }
});

// Gets a step by the ID supplied in the URL and renders the edit step page
router.get('/:id/recipe-steps/:stepId/edit', async (req, res, next) => {
  try {
    const recipeStep = await recipeStepController.getRecipeStep(req.params.id, req.params.stepId);
    if (!recipeStep) {
      throw new NotFoundException('Recipe step not found');
    }
    res.render('edit-step', ...recipeStep);
  } catch (err) {
      next(err);
    }
});

// Accepts the data submitted from the edit step page and calls the controller to persist it
router.post('/:id/recipe-steps/:stepId/edit', async (req, res, next) => {
  try {
    await recipeStepController.updateRecipeStep(req.params.id, req.params.stepId, req.body);
    res.redirect(`/recipes/${req.params.id}`); // Redirect to the recipe view upon successful step editing
  } catch (err) {
    next(new CustomException('Unable to update recipe step', err));
  }
});

module.exports = router;
