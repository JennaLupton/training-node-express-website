/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable no-undef */

// JQuery version to edit a step
$('.edit-step').click((event) => {
    const recipe_id = event.currentTarget.getAttribute('data-recipeid');
    const step_id = event.currentTarget.getAttribute('data-stepid');
    const step_number = event.currentTarget.getAttribute('step-number-value');
    const step_text = event.currentTarget.getAttribute('step-text-value');
    $('#confirm-edit-step').attr('data-recipeid', recipe_id);
    $('#confirm-edit-step').attr('data-stepid', step_id);
    $('#step-number').val(step_number);
    $('#step-text').val(step_text);
    $('#editStepDialog').modal();
    event.preventDefault();
});

$().ready(() => {
    $('#confirm-edit-step').click((event) => {
        const recipe_id = event.currentTarget.getAttribute('data-recipeid');
        const step_id = event.currentTarget.getAttribute('data-stepid');
        const newStep = JSON.stringify($('#edit-step-form').serializeArray());
        $.post(`/recipes/${recipe_id}/recipe-steps/${step_id}/edit`, {newStep}, () => {
            alert('Step successfully edited!');
            document.location.href = `/recipes/${recipe_id}`;
        }, 'json');
    });
});