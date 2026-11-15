const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');

let todos = []; //タスクを溜めておく場所
let nextId =1; //タスクのIDを管理

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const text = input.value.trim();
    if(text === '')return;
    todos.push({id: nextId++, text:text, done:false});
    nextId++;
    input.value ='';
    console.log(todos);

});