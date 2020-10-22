// JQuery version to delete a recipe
$('#delete-recipe').click((event) => {
    $('#deleteRecipeDialog').modal();

    /* if (confirm(`You've asked me to delete the recipe by going to the url ${url}!`)) {
        $.post(url, {}, () => {
            alert('Recipe successfully deleted!');
            document.location.href = '/recipes';
        }, 'json');
    };
    */

    event.preventDefault();
});

$().ready(() => {
    $('#confirm-delete-recipe').click((event) => {
        const recipe_id = event.currentTarget.getAttribute('data-recipeid');
        $.post(`/recipes/${recipe_id}/delete`, {}, () => {
            alert('Recipe successfully deleted!');
            document.location.href = '/recipes';
        }, 'json');
    });
});

// JQuery version to delete a step
$('.delete-step').click((event) => {
    const recipe_id = event.currentTarget.getAttribute('data-recipeid');
    const step_id = event.currentTarget.getAttribute('data-stepid');
    $('#confirm-delete-step').attr('data-recipeid', recipe_id);
    $('#confirm-delete-step').attr('data-stepid', step_id);
    $('#deleteStepDialog').modal();
    event.preventDefault();
});

$().ready(() => {
    $('#confirm-delete-step').click((event) => {
        const recipe_id = event.currentTarget.getAttribute('data-recipeid');
        const step_id = event.currentTarget.getAttribute('data-stepid');
        $.post(`/recipes/${recipe_id}/recipe-steps/${step_id}/delete`, {}, () => {
            alert('Step successfully deleted!');
            document.location.href = `/recipes/${recipe_id}`;
        }, 'json');
    });
});

// JQuery version to delete an ingredient
$('.delete-ingredient').click((event) => {
    const recipe_id = event.currentTarget.getAttribute('data-recipeid');
    const ingredient_id = event.currentTarget.getAttribute('data-ingredientid');
    $('#confirm-delete-ingredient').attr('data-recipeid', recipe_id);
    $('#confirm-delete-ingredient').attr('data-ingredientid', ingredient_id);
    $('#deleteIngredientDialog').modal();
    event.preventDefault();
});

$().ready(() => {
    $('#confirm-delete-ingredient').click((event) => {
        const recipe_id = event.currentTarget.getAttribute('data-recipeid');
        const ingredient_id = event.currentTarget.getAttribute('data-ingredientid');
        $.post(`/recipes/${recipe_id}/recipe-ingredients/${ingredient_id}/delete`, {}, () => {
            alert('Ingredient successfully deleted!');
            document.location.href = `/recipes/${recipe_id}`;
        }, 'json');
    });
});

// Traditional JavaScript version
/* document.getElementById('delete-recipe').addEventListener("click", (event) => {
    const url = event.currentTarget.getAttribute('href')
    if (confirm(`You've asked me to delete the recipe by going to the url ${url}!`)) {
        document.location.href = url;
    }
    event.preventDefault();
});
*/

function deleteRecipe(recipeId) {
    alert(`You've asked me to delete Recipe ${recipeId}!`);
};