const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const counter = document.getElementById('counter');  

let todos = []; //タスクを溜めておく場所
let nextId =1; //タスクのIDを管理

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const text = input.value.trim();
    if(text === '')return;
    todos.push({id: nextId++, text:text, done:false});
    // nextId++;
    input.value ='';
    render();

});

// ★ ここから下を追加
function render(){
    list.innerHTML = '';
    todos.forEach((todo) =>{
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = 'checkbox';
        checkbox.checked = todo.done;
        checkbox.addEventListener("change",()=>{
            todo.done = checkbox.checked;
            render();
        });
        
        const span = document.createElement("span");
        span.textContent = todo.text;

        li.appendChild(checkbox);
        li.appendChild(span);
        list.appendChild(li);
    })
    const doneCount = todos.filter((todo) => todo.done).length;
    counter.textContent = `全てのタスク：${todos.length} 完了済み：${doneCount} 未完了：${todos.length - doneCount}`;
}

// checkbox.addEventListener("change",()=>{
//     todo.done = checkbox.checked;
//     console.log(todo);
// });

render();