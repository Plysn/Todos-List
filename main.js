
var input = document.querySelector('input')
var button = document.getElementById('button-add')
var form = document.querySelector('form')
var todos = document.querySelector('.todo-list')

button.addEventListener('click', function(event){
  event.preventDefault()
  let value = input.value.trim()
  // let id = input.value.index
  if(value){
    addList({
      text: value,
      // id: index
    })
    saveTodoList()
  }

  input.value = ''
})

function addList(todo) {
  var li = document.createElement('li')
  li.innerHTML = `
    <span>${todo.text}</span>
    <div class="icon">
      <i class="fa-solid fa-pen-to-square edit"></i>
      <i class="fa-solid fa-trash delete"></i>
    </div>
  `

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

  li.querySelector('.edit').addEventListener('click', function(index){
    
  })
}

function saveTodoList(){
  let todoList = document.querySelectorAll('li')
  let todoStorage = []
  todoList.forEach(function(item){
    let text = item.querySelector('span').innerText
    let status = item.getAttribute('class')
    // let id = item.setItem('id', 'index')

    todoStorage.push({
      text,
      status
    })
  })
  localStorage.setItem('todoList', JSON.stringify(todoStorage))
}

function init(){
  let data = JSON.parse(localStorage.getItem('todoList'))
  data.forEach(function(item){
    addList(item)
  })
}
init()

const input1 = JSON.parse(localStorage.getItem('todoList'))
input1[0].text = "chiuchot"
console.log(input1[0].text);