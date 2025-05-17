/**
 * @type {HTMLInputElement}
 * Поле ввода новой задачи
 */
const todoInput = document.getElementById('todo-input');

/**
 * @type {HTMLElement}
 * Контейнер списка задач
 */
const todoList = document.getElementById('todo-list');

/**
 * @type {HTMLFormElement}
 * Форма для добавления новой задачи
 */
const todoForm = document.querySelector('.todo-form');

/**
 * @type {Array<{id: number, text: string, completed: boolean}>}
 * Массив задач
 */
let todos = [];

/**
 * Обработчик отправки формы. Создаёт новую задачу и добавляет в список.
 * @param {SubmitEvent} event
 */
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = todoInput.value.trim();
    if (!taskText) {
        alert('Task cannot be empty!');
        return;
    }

    /** @type {{id: number, text: string, completed: boolean}} */
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    todos.push(newTask);
    todoInput.value = '';
    renderTodos();
});

/**
 * Отрисовывает все задачи в DOM.
 * Обновляет содержимое todoList на основе массива todos.
 */
function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const completeButton = document.createElement('button');
        completeButton.className = 'complete';
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => toggleComplete(task.id));

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        actions.appendChild(completeButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(actions);
        todoList.appendChild(li);
    });
}

/**
 * Переключает состояние выполнения задачи (выполнено/не выполнено)
 * @param {number} id - Идентификатор задачи
 */
function toggleComplete(id) {
    todos = todos.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    renderTodos();
}

/**
 * Редактирует текст задачи по заданному ID.
 * @param {number} id - Идентификатор задачи
 */
function editTask(id) {
    const task = todos.find(task => task.id === id);
    const newText = prompt('Edit your task:', task.text);

    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        renderTodos();
    }
}

/**
 * Удаляет задачу по ID после подтверждения пользователя.
 * @param {number} id - Идентификатор задачи
 */
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos = todos.filter(task => task.id !== id);
        renderTodos();
    }
}
