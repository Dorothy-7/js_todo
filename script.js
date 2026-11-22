const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const counter = document.getElementById('counter');  

let todos = []; //タスクを溜めておく場所
let nextId =1; //タスクのIDを管理
let editingId = null;   //編集中のタスクのid。なければ null
let editingDraft = '';  // ★ 入力欄に打ちかけの文字

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const text = input.value.trim();
    if(text === '')return;
    todos.push({id: nextId++, text:text, done:false});
    input.value ='';
    render();

});


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
        

        li.appendChild(checkbox);
        if(todo.id === editingId){
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = editingDraft;             
            editInput.addEventListener("input",()=>{     
            editingDraft = editInput.value;          
        });                                         

            const saveButton = document.createElement("button");
            saveButton.textContent = "保存";
            saveButton.addEventListener("click",()=>{
                const newText = editInput.value.trim();             
                if(newText === '')return;                           
                todo.text = newText;                                
                editingId = null;
                editingDraft = '';                       
                render();                                           
            });     

            li.appendChild(editInput);
            li.appendChild(saveButton);

        }else{
            //通常時：文字、編集ボタン、削除ボタンを表示
            const span = document.createElement("span");
            span.textContent = todo.text;
            
            const editButton = document.createElement("button");
            editButton.textContent = "編集";
            editButton.addEventListener("click",()=>{
                editingId = todo.id;
                editingDraft = todo.text; 
                render();
            });
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "削除";
            deleteBtn.addEventListener("click",()=>{
                if(!confirm("本当によろしいですか？"))return;
                    todos = todos.filter((t) => t.id !== todo.id);
                    render();
            });
            li.appendChild(span);
            li.appendChild(editButton);
            li.appendChild(deleteBtn);
        }
        list.appendChild(li); 
    })
    const doneCount = todos.filter((todo) => todo.done).length;
    counter.textContent = `全てのタスク：${todos.length} 完了済み：${doneCount} 未完了：${todos.length - doneCount}`;
}

render();