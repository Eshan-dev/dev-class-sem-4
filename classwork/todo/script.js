const input_value = document.getElementById("input");
const add_button = document.getElementById("add_task");
const list = document.getElementById("list");

function addTask(data) {
    const task = document.createElement('l1');
    const text = document.createElement('p');
    text.innerText = data;
    const delete_button = document.createElement('button');
    delete_button.addEventListener('click', function () {
        task.remove();
    })
    delete_button.innerText = "Delete Task";
    // const update_button = document.createElement("button");
    task.appendChild(text);
    task.appendChild(delete_button);
    list.appendChild(task);

}
add_button.addEventListener('click', function () {
    const data = input_value.value;
    addTask(data);
})