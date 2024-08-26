const $modal = document.getElementById('modal');
const $descriptionInput = document.getElementById('description');
const $priorityInput = document.getElementById('priority');
const $deadLineInput = document.getElementById('deadline');

const $todoColumnBody = document.querySelector('#todoColumn .body');

var todoList = [];

function openModal(){   /*abrir modal*/
    $modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal(){ /*fechar modal */
    $modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function generateCards (){ /*gerar cards */
    const todoListhtml = todoList.map(function(task){
        return `
            <div class="card">
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
        description: $descriptionInput.value,
        priority: $priorityInput.value,
        deadLine: $deadLineInput.value,
    }

    todoList.push(newTask);

    closeModal();
    generateCards();
}

