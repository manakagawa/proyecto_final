document.addEventListener('DOMContentLoaded', async () => {
    const addTaskBtn   = document.getElementById('addTaskBtn');
    const newTaskInput = document.getElementById('newTaskInput');
    const taskList     = document.getElementById('taskList');

    await loadTasks();

    addTaskBtn.addEventListener('click', async () => {
        await addTasks();
        saveTasks();
    });

    document.querySelector('form').addEventListener('submit', async (event) => {
        event.preventDefault();
        await addTasks();
        saveTasks();
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            event.target.parentElement.remove();
            saveTasks();
        } else if (event.target.classList.contains('task-content')) {
            event.target.parentElement.classList.toggle('completed');
            saveTasks();
        }
    });

    async function addTasks() {
        const taskText = newTaskInput.value.trim();
        if (!taskText) return; // Evita tareas vacías

        const taskElement = createTaskElement(taskText);
        taskList.appendChild(taskElement);
        newTaskInput.value = '';
    }

    async function saveTasks() {
        const tasks = Array.from(document.querySelectorAll('.task-content'))
                           .map(task => task.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    async function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => taskList.appendChild(createTaskElement(taskText)));
    }

    function createTaskElement(taskText) {
        const taskElement = document.createElement('div');
        taskElement.className = 'list-group-item d-flex justify-content-between align-items-center';
        taskElement.innerHTML = `
            <span class="task-content">${taskText}</span>
            <button class="btn btn-danger delete-btn">Eliminar</button>
        `;
        return taskElement;
    }
});
