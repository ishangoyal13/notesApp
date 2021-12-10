const fs = require('fs')
const chalk = require('chalk')

// adding a new note
const addNote = (title,summary) => {
  const notes = loadNotes();
  const duplicateNotes = notes.map(function (note){
    return note.title === title
  })
  if(duplicateNotes.length === 0){
    notes.push({
      title : title,
      summary : summary
    })
    savedNotes(notes)
    console.log(chalk.green.bold('New note added..'))
  } else {
    console.log(chalk.red.bold('Note title already taken !!'))
  }
}

// removing a note
const removeNote = function(title) {
  const notes = loadNotes()
  const r_notes = notes.filter(function (note) {
    return note.title !== title
  })
  if(JSON.stringify(r_notes) === JSON.stringify(notes)){
    console.log(chalk.red.bold('No note found !'))
  } else {
    console.log(chalk.green.bold('Note removed successfully'))
  }
  savedNotes(r_notes)
}

// list down all the notes
const listNotes = function() {
  const notes = loadNotes()
  console.log(chalk.yellow.bold('Your notes ->'))
  notes.map((note) => {
    return console.log(note.title)
  })
}

const readNotes = function(title) {
  const notes = loadNotes()

  const note = notes.find((note) => {
    return note.title === title
  })

  if (note) {
    console.log(chalk.blue.bold(note.title))
    console.log(note.summary)
  } else {
    console.log(chalk.red.bold('No note found...'))
  }

}

// fetch previously saved notes
const savedNotes = function(notes) {
  const dataJson = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJson)
}

// load the notes
const loadNotes = function() {
  try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJson = dataBuffer.toString()
    return JSON.parse(dataJson)
  } catch (e) {
    return []
  }
}


module.exports = {
  addNote : addNote,
  removeNote : removeNote,
  listNotes : listNotes,
  readNotes : readNotes
}