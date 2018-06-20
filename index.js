document.addEventListener("DOMContentLoaded", function () {
  const usersAPI = "http://localhost:3000/api/v1/users"
  const notesAPI = "http://localhost:3000/api/v1/notes"
  const ul = document.getElementById("note-ul")
  const div = document.getElementById('left-bar')
  const rightDiv = document.getElementById("right-bar")

  function getAllNotes () {
    fetch(notesAPI).then(response => response.json()).then(iterateNotes)
  }

  function iterateNotes (notesObjs) {
    notesObjs.forEach(getOneNote)
  }
//1
  function getOneNote (noteObj) {
    const li = document.createElement("li")
    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    const editButton = document.createElement("button")
    const deleteButton = document.createElement("button")
    const br = document.createElement("br")

    li.setAttribute("id", noteObj.id)
    editButton.setAttribute("class", "edit")
    editButton.id = "edit-button"
    editButton.innerText = "Edit"
    deleteButton.setAttribute("class", "delete")
    deleteButton.id = "delete-button"
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
//2
  function makeNewDetailForm (){
    const newNoteForm = document.createElement("form")
    const inputButton = document.createElement("input")
    const br = document.createElement("br")

    inputButton.setAttribute("type", "submit")
    inputButton.setAttribute("value", "Make A New Note")
    newNoteForm.appendChild(br)
    newNoteForm.appendChild(inputButton)
    div.appendChild(newNoteForm)

    newNoteForm.addEventListener("submit", function (event){
      event.preventDefault()
      newDetailDiv(event)
    })
  }

  ul.addEventListener('click', function (event){
    const editButton = document.getElementById("edit-button")
    const deleteButton = document.getElementById("delete-button")

    if (event.target.id === "edit-button"){
      newDetailDiv(event)
    } else if (event.target.id === "delete-button"){
      console.log(event)
       fetch(`${notesAPI}/${event.path[2].id}`, {method: "delete"}).then(response => response.json()).then(deleteNote(event))
    } else if (event.target.tagName === "P" || event.target.tagName === "H2"){
      console.log(event)
      if (!document.getElementById("right-form")){
      fetch(`${notesAPI}/${event.path[1].id}`).then(r => r.json()).then(makeNewDetailFormFromObj)
    } else {
      //change form back to div
    }
    }
  })

  rightDiv.addEventListener("click", function (event){
    if (event.target.id === "right-edit-button"){
      changeDivToForm(event)
    }
  })

  rightDiv.addEventListener("submit", function (event) {
    event.preventDefault()
    if (event.target[2].attributes[1].value === "Save"){
      const rightTitle = document.getElementById("right-title")
      const rightDetails = document.getElementById("right-details")
      const rightForm = document.getElementById("right-form")
      const newNoteButton = document.querySelector("[value=Save]")

      config = {
        headers: {
          "Content-Type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify({title: rightTitle.value, body: rightDetails.value, user_id: 1})
      }
      fetch(notesAPI, config).then(response => response.json()).then(getOneNote)

      changeElementType(rightForm, rightTitle, rightDetails, newNoteButton)

    } else if (event.target.value === "Edit"){
        changeElementType(rightForm, rightTitle, rightDetails, newNoteButton)
    } else if (event.target.value === "Update"){

        console.log(event)
        // config = {
        //   headers: {
        //     "Content-Type" : "application/json"
        //   },
        //   method: "PATCH",
        //   body: JSON.stringify({title: rightTitle.value, body: rightDetails.value, user_id: 1})
        // }
        // fetch(`${notesAPI}/${}`, )
      }
  })

  function changeDivToForm (event) {
    newDetailDiv (event)

  }

  function makeNewDetailFormFromObj (noteObj) {
    if (!document.getElementById("new-note-div")){
      const newRightDiv = document.createElement("div")
      const newRightH = document.createElement("h3")
      const newRightP = document.createElement("p")
      const newNoteButton = document.createElement("input")
      const br1 = document.createElement("br")

      newNoteButton.id = "right-edit-button"
      newNoteButton.setAttribute("type", "submit")
      newNoteButton.setAttribute("value", "Edit")
      newRightH.id = "right-h3"
      newRightP.id = "right-p"
      newRightDiv.setAttribute("id", "new-note-div")
      newRightH.innerText = noteObj.title
      newRightP.innerText = noteObj.body

      newRightP.appendChild(br1)
      newRightP.appendChild(newNoteButton)
      newRightH.appendChild(newRightP)
      newRightDiv.appendChild(newRightH)
      rightDiv.appendChild(newRightDiv)
    } else {
        const newRightH = document.getElementById("right-h3")
        const newRightP = document.getElementById("right-p")
        const newNoteButton = document.createElement("input")
        const br1 = document.createElement("br")


        newNoteButton.setAttribute("type", "submit")
        newNoteButton.setAttribute("value", "Edit")
        newNoteButton.id = "right-save"
        newRightP.textContent = noteObj.body
        newRightH.textContent = noteObj.title

        newRightP.appendChild(br1)
        newRightP.appendChild(newNoteButton)
        newRightH.appendChild(newRightP)
      }

  }

  function deleteNote (event) {
    event.path[2].remove(event.path[2].id)
  }


//3
  function newDetailDiv (event) {
  //  console.log(event)
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
      newNoteButton.setAttribute("value", "Save")
      rightTitle.setAttribute("type", "text")
      rightForm.setAttribute("id", "right-form")
      rightTitle.id = "right-title"
      rightDetails.id = "right-details"

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
//4
      if (!event.target.id === "right-edit-button") {
      rightDiv.appendChild(rightForm)


    } else {
//5
      rightDiv.appendChild(rightForm)

      newDetailDiv(event)

  //    debugger
  //    changeElementType (rightForm, rightTitle, rightDetails, newNoteButton)
    }

  }

  }

  function changeElementType (rightForm, rightTitle, rightDetails, newNoteButton) {
    if (!document.getElementById("right-h3")) {
      const newRightH = document.createElement("h3")
      const newRightP = document.createElement("p")

      newRightH.id = "right-h3"
      newRightH.innerText = rightTitle.value
      newRightP.id = "right-p"
      newRightP.innerText = rightDetails.value

      // rightForm.remove()
    //  rightForm.replaceChild(newRightDiv, rightForm)
      rightTitle.parentNode.replaceChild(newRightH, rightTitle)
      rightDetails.parentNode.replaceChild(newRightP, rightDetails)
      newNoteButton.setAttribute("value", "Edit")
  } else {
    const newRightH = document.getElementById("right-h3")
    const newRightP = document.getElementById("right-p")
    const newRightDiv = document.getElementById("new-note-div")


    newRightH.parentNode.replaceChild(rightTitle, newRightH)
    newRightP.parentNode.replaceChild(rightDetails, newRightP)
    newRightDiv.parentNode.replaceChild(rightForm, newRightDiv)
    newNoteButton.setAttribute("value", "Update")
  }
  }



  function startApp () {
    getAllNotes()
    makeNewDetailForm()
  }

  startApp()

})
