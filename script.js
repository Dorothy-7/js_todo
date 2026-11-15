const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = []; //タスクを溜めておく場所
let nextId =1; //タスクのIDを管理

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const text = input.value.trim();
    if(text === '')return;
    todos.push({id: nextId++, text:text, done:false});
    nextId++;
    input.value ='';
    render();

});

// ★ ここから下を追加
function render(){
    list.innerHTML = '';
    todos.forEach((todo) =>{
        const li = document.createElement("li");
        li.textContent = todo.text;
        list.appendChild(li);
    })
}