document.addEventListener("DOMContentLoaded", function () {
  const usersAPI = "http://localhost:3000/api/v1/users"
  const notesAPI = "http://localhost:3000/api/v1/notes"
  const ul = document.getElementById("note-ul")
  const div = document.getElementById('left-bar')

  function getAllNotes () {
    fetch(notesAPI).then(response => response.json()).then(iterateNotes)
  }

  function iterateNotes (notesObjs) {
    notesObjs.forEach(getOneNote)
  }

  function getOneNote (noteObj) {
    const li = document.createElement("li")
    const h2 = document.createElement("h2")
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

    ul.addEventListener('click', function (event){
      if (event.target === editButton){
        console.log("hi")
      } else if (event.target === deleteButton){
        // fetch(`${notesAPI}/${noteObj.id}`, {method: "delete"}).then(response => response.json()).then(json => return json)
      }
    })
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
      console.log(event)
      newDetailDiv()
    })
  }

  function newDetailDiv () {
    const rightDiv = document.getElementById("right-bar")
    if (!document.getElementById('right-form')) {
      const rightForm = document.createElement("form")
      const rightTitle = document.createElement("input")
      const rightDetails = document.createElement("textarea")
      const br = document.createElement("br")
      const br2 = document.createElement("br")
      const br3 = document.createElement("br")
      const br4 = document.createElement("br")
      const br5 = document.createElement("br")
      const newNoteButton = document.createElement("input")
      const titleText = document.createTextNode("Note Title")
      const descriptionText = document.createTextNode("Note Description")

      newNoteButton.setAttribute("type", "submit")
      newNoteButton.setAttribute("value", "New Note")
      rightTitle.setAttribute("type", "text")
      rightForm.setAttribute("id", "right-form")

      rightForm.appendChild(br2)
      rightForm.appendChild(titleText)
      rightForm.appendChild(br5)
      rightForm.appendChild(rightTitle)
      rightForm.appendChild(br)
      rightForm.appendChild(descriptionText)
      rightForm.appendChild(br4)
      rightForm.appendChild(rightDetails)
      rightForm.appendChild(br3)
      rightForm.appendChild(newNoteButton)
      rightDiv.appendChild(rightForm)

      rightDiv.addEventListener("submit", function (event) {
        event.preventDefault()
        //console.log(event)
        config = {
          headers: {
            "Content-Type" : "application/json"
          },
          method: "POST",
          body: JSON.stringify({title: event.path["0"]["0"].value, body: event.path["0"][1].value, user_id: 1})
        }
        fetch(notesAPI, config).then(response => response.json()).then(getOneNote)
      })
  }
  }

  function startApp () {
    getAllNotes()
    makeNewDetailForm()
  }

  startApp()

})
