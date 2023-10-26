document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskLists = {
        todo: document.getElementById("todo-list"),
        doing: document.getElementById("doing-list"),
        done: document.getElementById("done-list"),
    };

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
    
        if (taskText !== "") {
            const li = document.createElement("li");
            li.innerHTML = `
                ${taskText}
                <img src="lixeira.png"  class="delete-task">
            `;
    
            taskLists.todo.appendChild(li);
    
            // Limpar os campos de entrada
            taskInput.value = "";
    
            // Adicionar um evento de clique para excluir a tarefa
            const deleteButton = li.querySelector(".delete-task");
            deleteButton.addEventListener("click", function () {
                li.remove();
            });
        }
    });
    

    // Inicializar Sortable.js nas listas de tarefas
    new Sortable(taskLists.todo, {
        group: "tasks",
        animation: 150,
    });

    new Sortable(taskLists.doing, {
        group: "tasks",
        animation: 150,
    });

    new Sortable(taskLists.done, {
        group: "tasks",
        animation: 150,
    });
});
