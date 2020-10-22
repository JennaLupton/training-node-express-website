/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable no-undef */

// JQuery version to edit a step
$('.edit-step').click((event) => {
    const recipe_id = event.currentTarget.getAttribute('data-recipeid');
    const step_id = event.currentTarget.getAttribute('data-stepid');
    $('#confirm-edit-step').attr('data-recipeid', recipe_id);
    $('#confirm-edit-step').attr('data-stepid', step_id);
    $('#editStepDialog').modal();
    event.preventDefault();
});

$().ready(() => {
    $('#confirm-edit-step').click((event) => {
        const recipe_id = event.currentTarget.getAttribute('data-recipeid');
        const step_id = event.currentTarget.getAttribute('data-stepid');
        const updatedStep = JSON.stringify($('edit-step-form').serializeArray());
        $.post(`/recipes/${recipe_id}/recipe-steps/${step_id}/edit`, {updatedStep}, () => {
            alert('Step successfully edited!');
            document.location.href = `/recipes/${recipe_id}`;
        }, 'json');
    });
});