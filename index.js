const taskAdderText = document.getElementsByClassName("taskAdderText")[0]
const taskAdderBtn = document.getElementsByClassName("taskAdderBtn")[0]
const tasksContainer = document.getElementsByClassName("container");

let tasks = []

const DEFAULT_NOTE_TEXT = "Enter Note"


// Check if Storage is Available 
if ( localStorage.getItem("tasks") ) {
    tasks = JSON.parse(localStorage.getItem("tasks"))
    
    tasks.forEach((element,index)=>{
        renderTasks(element,index);
    });
}

const setupTimeFunction = ()=>{
    let hours = 3; 
    let now = new Date().getTime();
    let setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > hours*60*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
    }
}
setupTimeFunction();

// Create Nodes
taskAdderText.addEventListener("click",()=>{
    // Defining default behaviour
    if(taskAdderText.innerText.toLowerCase().slice() === DEFAULT_NOTE_TEXT.toLowerCase()){
        taskAdderText.innerText = "";
    }   
})

taskAdderText.addEventListener("focusout", ()=>{
    // Defining default behaviour
    if(taskAdderText.innerText.slice() === ""){
        taskAdderText.innerText = DEFAULT_NOTE_TEXT;
    }
})

// Add New Tasks
taskAdderBtn.addEventListener("click", ()=>{
    // Add if text Entered
    if(taskAdderText.innerText.slice() !== DEFAULT_NOTE_TEXT){      
        const task = taskAdderText.innerText
        tasks.push(task);
        renderTasks();  
        taskAdderText.innerText = ""
    } 
})
taskAdderText.addEventListener("dblclick" , ()=>{
    if(taskAdderText.innerText === "" || taskAdderText.innerText == "\n" || taskAdderText.innerText == "Enter Note"){
        taskAdderBtn.disabled = true
        console.log(taskAdderText.innerText)
    }
    else {
        console.log(taskAdderText.innerText)
        taskAdderBtn.disabled = false
    }
})

function renderTasks(note, noteIndex) {
    // Creating Note Node
    const textContentContainer = document.createElement("div")
        
    const textNode = document.createElement("p");
    textNode.contentEditable = false;
    textContentContainer.id = `note${noteIndex}` || `note${tasks.length-1}`
    textContentContainer.className = "card"
    textNode.innerText = note || taskAdderText.innerText;
    textContentContainer.appendChild(textNode)
    
    // Delete Button
    let deleteBtn = document.createElement("button")
    deleteBtn.innerText = "X"
    deleteBtn.className = "deleteNoteBtn"

    textContentContainer.appendChild(deleteBtn)

    deleteBtn.addEventListener("click", ()=>{
        tasks = tasks.filter(task => task !== textNode.innerText)
        deleteBtn.parentElement.remove()
        
        // Add To Local Storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    })

    // Creating Edit Node
    let editBtn = document.createElement("button")
    editBtn.innerText = "edit"
    editBtn.className = "editNoteBtn"
    textContentContainer.appendChild(editBtn)

    editBtn.addEventListener("click", () => {
        if(textNode.contentEditable === "false") {
            textNode.contentEditable = "true"
            editBtn.innerText = "done"
            editBtn.style.backgroundColor = "green"
        }
        else {
            textNode.contentEditable = "false"
            editBtn.innerText = "edit"  
            editBtn.style.backgroundColor = "orange"
            editBtn.style.border = "orange"
        }

        if(editBtn.innerText === "edit"){
            // Change in array
            let NoteIndex = textContentContainer.id.slice(4)
            tasks[NoteIndex] = textNode.innerText;
            console.log(textNode.innerText)
        }
        // Add To Local Storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    })

    tasksContainer[0].appendChild(textContentContainer)
    console.log(tasks)

    // Add To Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}





