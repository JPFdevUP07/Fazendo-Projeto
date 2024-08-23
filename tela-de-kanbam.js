const $modal = document.getElementById('modal');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $deadLineInput = documen.getElementById('deadline');


function openModal(){
    $modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal(){
    $modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function createTask() {
    console.log($descriptionInput.value);
    console.log($priorityInput.value);
    console.log($deadLineInput.value);
}