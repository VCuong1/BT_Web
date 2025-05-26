// Quản lý mảng công việc
let tasks = [];
let currentFilter = 'all';

// Đọc tasks từ localStorage khi tải trang
window.onload = function () {
    loadTasksFromLocalStorage();
    renderTasks();
};

// Thêm sự kiện cho nút "Thêm công việc"
document.getElementById('add-task-btn').addEventListener('click', addTask);

// Bắt sự kiện Enter trong ô input
document.getElementById('task-input').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') addTask();
});

// Sự kiện filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        renderTasks();
    });
});

// Thêm công việc
function addTask() {
    const input = document.getElementById('task-input');
    const title = input.value.trim();

    if (!title) {
        alert('Vui lòng nhập nội dung công việc!');
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        isDone: false
    };

    tasks.push(newTask);
    saveTasksToLocalStorage();
    renderTasks();

    input.value = '';
}

// Hiển thị danh sách công việc theo filter
function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = '';

    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const span = document.createElement('span');
        span.className = 'task-title' + (task.isDone ? ' completed' : '');
        span.textContent = task.title;
        span.title = 'Nhấn để đánh dấu hoàn thành';

        // Đánh dấu hoàn thành
        span.addEventListener('click', function () {
            toggleTaskDone(task.id);
        });

        // Nút xóa
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Xóa';
        delBtn.title = 'Xóa công việc';

        delBtn.addEventListener('click', function () {
            deleteTask(task.id);
        });

        li.appendChild(span);
        li.appendChild(delBtn);

        list.appendChild(li);
    });
}

// Đánh dấu hoàn thành
function toggleTaskDone(id) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
        tasks[idx].isDone = !tasks[idx].isDone;
        saveTasksToLocalStorage();
        renderTasks();
    }
}

// Xóa công việc
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasksToLocalStorage();
    renderTasks();
}

// Lưu vào localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

// Load từ localStorage
function loadTasksFromLocalStorage() {
    const data = localStorage.getItem('todo_tasks');
    if (data) {
        tasks = JSON.parse(data);
    }
}