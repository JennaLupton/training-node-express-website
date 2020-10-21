document.getElementById('delete-recipe').addEventListener("click", (event) => {
    const url = event.currentTarget.getAttribute('href')
    alert(`You've asked me to delete the recipe by going to the url ${url}!`);
    event.preventDefault();
});

function deleteRecipe(recipeId) {
    alert(`You've asked me to delete Recipe ${recipeId}!`);
};