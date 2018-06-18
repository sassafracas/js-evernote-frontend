document.addEventListener("DOMContentLoaded", function () {
  const usersAPI = "http://localhost:3000/api/v1/users"
  const notesAPI = "http://localhost:3000/api/v1/notes"


  function getAllNotes () {
    fetch(notesAPI).then(response => response.json()).then(iterateNotes)
  }

  function iterateNotes (notesObjs) {
    notesObjs.forEach(getOneNote)
  }

  function getOneNote (noteObj) {
    const ul = document.createElement("ul")
    const li = document.createElement("li")
    const h2 = document.createElement("h2")
    const div = document.getElementById('left-bar')
    const p = document.createElement("p")
    const editButton = document.createElement("button")
    const deleteButton = document.createElement("button")
    const br = document.createElement("br")

    editButton.setAttribute("class", "edit")
    editButton.innerText = "Edit"
    deleteButton.setAttribute("class", "delete")
    deleteButton.innerText = "Delete"

    h2.innerText = noteObj.title
    p.innerText = noteObj.body.substring(0, 100) + "..."

    li.appendChild(h2)
    p.appendChild(br)
    p.appendChild(br)
    p.appendChild(editButton)
    p.appendChild(deleteButton)
    li.appendChild(p)
    ul.appendChild(li)
    div.appendChild(ul)
  }

  function makeNewDetailForm (){
    const body = document.getElementById('main-body')
    const newNoteForm = document.createElement("form")
    const inputButton = document.createElement("input")
    const br = document.createElement("br")


    inputButton.setAttribute("type", "submit")
    inputButton.setAttribute("value", "Submit")
    newNoteForm.innerText = "New Note"
    newNoteForm.appendChild(br)
    newNoteForm.appendChild(inputButton)
    body.appendChild(newNoteForm)
    
    newNoteForm.addEventListener("submit", function (event){
      event.preventDefault()
      console.log(event) //this will point to a function to create an empty details page
    })
  }

  function startApp () {
    getAllNotes()
    makeNewDetailForm()
  }

  startApp()

})
