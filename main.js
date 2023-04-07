
var input = document.querySelector('input')
var button = document.getElementById('button-add')
var form = document.querySelector('form')
var todos = document.querySelector('.todo-list')
// get data from local storage
let data = JSON.parse(localStorage.getItem('todoList'))

button.addEventListener('click', function(event){
  event.preventDefault()
  let value = input.value.trim()
  let id = new Date().toISOString()
    addList({
      text: value,
      status: null,
      id: id
    })
    saveTodoList()
    input.value = ''
  }
)

function addList(todo) {
  var li = document.createElement('li')
  li.innerHTML = `
    <span>${todo.text}</span>
    <div class="icon">
      <i class="fa-solid fa-pen-to-square edit"></i>
      <i class="fa-solid fa-trash delete"></i>
    </div>
  `
  li.id = todo.id

  if(todo.status === 'completed') {
    li.setAttribute('class', 'completed')
  }

  li.querySelector('span').addEventListener('click', function(){
    li.classList.toggle('completed')
    saveTodoList()
  })

  li.querySelector('.delete').addEventListener('click', function(){
    if(confirm('Cancel?')){
      li.remove()
    }
    saveTodoList()
  })

  todos.appendChild(li)

  li.querySelector('.edit').addEventListener('click', function(event){
    const taskId = li.id;
    const editTask = data.find((task) => task.id === taskId);

    const newTaskText = prompt("Edit task", editTask.text);
    if (newTaskText) {
      li.querySelector("span").innerText = newTaskText;
      saveTodoList();
    }
  })
}

function saveTodoList(){
  let todoList = document.querySelectorAll('li')
  let todoStorage = []
  todoList.forEach(function(item){
    let text = item.querySelector('span').innerText
    let status = item.getAttribute('class')
    let id = item.id

    todoStorage.push({
      text,
      status,
      id
    })
  })
  data = todoStorage
  localStorage.setItem('todoList', JSON.stringify(todoStorage))
}

function init(){
  data.forEach(function(item){
    addList(item)
  })
}
init()