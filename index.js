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

    h2.innerText = noteObj.title
    p.innerText = noteObj.body.substring(0, 100) + "..."
    
    li.appendChild(h2)
    li.appendChild(p)
    ul.appendChild(li)
    div.appendChild(ul)
  }

  function startApp () {
    getAllNotes()
  }

  startApp()

})
