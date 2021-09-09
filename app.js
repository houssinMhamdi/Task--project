//define UI vars 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-taskes');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event  listeres
loadEventListeres();

function loadEventListeres(){
    //DOM load event 
    document.addEventListener("DOMContentLoaded",getTaskes);
    //add task event
    form.addEventListener('submit',addTaske);
    //remove task event
    taskList.addEventListener('click',removeTaske);
    //clear task event
    clearBtn.addEventListener('click',clearTaskes);
    //filter taskes events
    filter.addEventListener('keyup',filterTskes);
    
}
//get task from ls 
function getTaskes(){
    let tasks;
    if (localStorage.getItem('tasks' === null)) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    //creat text node and append
    li.appendChild(document.createTextNode(task));
    //creat new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content ';
    //icon html
    link.innerHTML = '<i class="fas fa-times"></i>';
    //append link to li 
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    });

}

//addtaske func
function addTaske(e){
    if (taskInput.value === '') {
        alert('Add a task...');
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    //creat text node and append
    li.appendChild(document.createTextNode(taskInput.value));
    //creat new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content ';
    //icon html
    link.innerHTML = '<i class="fas fa-times"></i>';
    //append link to li 
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

    //store in LS
    storTaskInLs(taskInput.value);

    //Clear the input
    taskInput.value = '';

    e.preventDefault();
}
    //store in ls
    function storTaskInLs(task){
        let tasks;
        //check LS if any taskes in there
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task)
        localStorage.setItem('tasks',JSON.stringify(tasks)); 
    }



//remove Taskes
function removeTaske(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log(e.target);
        // console.log(e.target.parentElement);
        // console.log(e.target.parentElement.parentElement);
        if (confirm(`Are You Sure ?`)) {
         e.target.parentElement.parentElement.remove();
         //remove from LS
         removeTasksFromLS(e.target.parentElement.parentElement);
        }
        
    }
}
//remove from localstroage
function removeTasksFromLS(removeTasks){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks=[];

    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if (removeTasks.textContent === task) {
            tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
function clearTaskes(){
    // taskList.innerHTML = ''; 
    while(taskList.firstChild){ //this is more faster
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLS();
}
//clear task from LS
function clearTasksFromLS(){
    localStorage.clear();
}

function filterTskes(e){
const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        console.log(item);
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
     
    });
    console.log(text);  
}