const $modal = document.getElementById('modal');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $deadLineInput = document.getElementById('deadline');
const $columnInput = document.getElementById('column');
const $idInput = document.getElementById('idInput');

const $criationModeTitle = document.getElementById('crationModeTitle');
const $editingModeTitle = document.getElementById('editingModeTitle');

const $crationModeButton = document.getElementById('crationModeButton');
const $editingModeButton = document.getElementById('editingModeButton');


var taskList = [];

function openModal(data_column){   /*abrir modal*/
    $modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    $columnInput.value = data_column;

    $criationModeTitle.style.display = "block";
    $editingModeTitle.style.display = "none";

    $crationModeButton.style.display = "block";
    $editingModeButton.style.display = "none";
          
}

function openModalToEdit(id){   /*abrir modal para editar*/
    $modal.style.display = "flex";
    document.body.style.overflow = "hidden";

   
    $criationModeTitle.style.display = "none";
    $editingModeTitle.style.display = "block";

    $crationModeButton.style.display = "none";
    $editingModeButton.style.display = "block";

    const index = taskList.findIndex(function(task) {
        return task.id == id;
    });

    const task = taskList[index];

    $idInput.value = task.id;
    $descriptionInput.value = task.description;
    $priorityInput.value = task.priority;
    $deadLineInput.value = task.deadLine;
    $columnInput.value = task.column;
       
}


function closeModal(){ /*fechar modal */
    $modal.style.display = "none";
    document.body.style.overflow = "auto";

    $idInput.value = "";
    $descriptionInput.value = "";
    $priorityInput.value = "";
    $deadLineInput.value = "";
    $columnInput.value = "";
}

function resetColumns() {
    document.querySelector('[data-column="1"] .body .cardsList').innerHTML = "";
    document.querySelector('[data-column="2"] .body .cardsList').innerHTML = "";
    document.querySelector('[data-column="3"] .body .cardsList').innerHTML = "";
    document.querySelector('[data-column="4"] .body .cardsList').innerHTML = "";
}

function generateCards() {
    // Chama o resetColumns uma vez, antes de começar a gerar os cards
    resetColumns();

    // Itera sobre a lista de tarefas para gerar os cards
    taskList.forEach(function (task) {
        const columnBody = document.querySelector(`[data-column="${task.column}"] .body .cardsList`);

        const card = `
            <div id="${task.id}" class="card" ondblclick="openModalToEdit(${task.id})" draggable="true">
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
        columnBody.innerHTML += card;
    });
}

function createTask(){ /*criando tasks */
    const newTask = {
        id: Math.floor(Math.random() * 9999999),
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        deadLine: $deadLineInput.value,
        column: $columnInput.value,
    };

    taskList.push(newTask);

    closeModal();
    generateCards();
   
}

function updateTask(){
    const task = {
        id: $idInput.value,
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        deadLine: $deadLineInput.value,
        column: $columnInput.value,
    };

    
    const index = taskList.findIndex(function(task) {
        return task.id == $idInput.value;
    });

    taskList[index] = task;

    closeModal();
    generateCards();
}

function changeColumn(task_id, column_id){
    if(task_id && column_id){
        taskList = taskList.map((task) => {
            if (task_id !== task.id) return task;

            return{
                ...task,
                column:column_id,
            };
        });
    }   
}

function dragstart_handler(ev) {
    console.log(ev);

    // Adiciona o id do elemento alvo para o objeto de transferência de dados
    ev.dataTransfer.setData("my_custom_data", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
}
function dragover_handler(ev) {
    ev.preventDefault();
    // Define o dropEffect para ser do tipo move
    ev.dataTransfer.dropEffect = "move";
}
function drop_handler(ev) {
    ev.preventDefault();
    // Pega o id do alvo e adiciona o elemento que foi movido para o DOM do alvo
    const data = ev.dataTransfer.getData("my_custom_data");

    console.log(ev);
}