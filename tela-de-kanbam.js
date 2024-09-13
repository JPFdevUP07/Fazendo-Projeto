const $modal = document.getElementById('modal');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $deadLineInput = document.getElementById('deadline');
const $idInput = document.getElementById('idInput');

const $todoColumnBody = document.querySelector('#todoColumn .body');

const $criationModeTitle = document.getElementById('crationModeTitle');
const $editingModeTitle = document.getElementById('editingModeTitle');

const $crationModeButton = document.getElementById('crationModeButton');
const $editingModeButton = document.getElementById('editingModeButton');


var todoList = [];

function openModal(id){   /*abrir modal*/
    $modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    if(id) {
        $criationModeTitle.style.display = "none";
        $editingModeTitle.style.display = "block";

        $crationModeButton.style.display = "none";
        $editingModeButton.style.display = "block";

        const index = todoList.findIndex(function(task) {
            return task.id == id;
        });

        const task = todoList[index];

        $idInput.value = task.id;
        $descriptionInput.value = task.description;
        $priorityInput.value = task.priority;
        $deadLineInput.value = task.deadLine;
    } else {
        $criationModeTitle.style.display = "block";
        $editingModeTitle.style.display = "none";

        $crationModeButton.style.display = "block";
        $editingModeButton.style.display = "none";
    }      
}

function closeModal(){ /*fechar modal */
    $modal.style.display = "none";
    document.body.style.overflow = "auto";

    $idInput.value = "";
    $descriptionInput.value = "";
    $priorityInput.value = "";
    $deadLineInput.value = "";
}



function generateCards (){ /*gerar cards */
    const todoListhtml = todoList.map(function(task){
        return `
            <div class="card" ondblclick="openModal(${task.id})">
                <div class="info">
                    <b>Descrição</b>
                    <span>${task.description}</span>
                </div>

                 <div class="info">
                    <b>Prioridade</b>
                    <span>${task.priority}</span>
                </div>

                 <div class="info">
                    <b>Prazo</b>
                    <span>${task.deadLine}</span>
                </div>
            </div>
        `;
    })

    $todoColumnBody.innerHTML = todoListhtml.join('');
}

function createTask(){ /*criando tasks */
    const newTask = {
        id: Math.floor(Math.random() * 9999999),
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        deadLine: $deadLineInput.value,
    }

    todoList.push(newTask);

    closeModal();
    generateCards();
   
}

function updateTask(){
    const task = {
        id: $idInput.value,
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        deadLine: $deadLineInput.value,
    }

    
    const index = todoList.findIndex(function(task) {
        return task.id == $idInput.value;
    });

    todoList[index] = task;

    closeModal();
    generateCards();
}
