const fs = require('fs')
const chalk = require('chalk')

const NOTE_FILE_NAME = 'notes.json'

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync(NOTE_FILE_NAME)
    const dataJSON = JSON.parse(dataBuffer.toString())
    return dataJSON
  } catch (e) {
    return []
  }
}

const saveNotes = function (notes) {
  fs.writeFileSync(NOTE_FILE_NAME, JSON.stringify(notes))
}

const addNote = function (title, body) {
  const notes = loadNotes()
  const hasNote = notes.some(function (note) {
    return note.title === title
  })

  if (hasNote) {
    console.log(chalk.red('Note title taken!'))
    return
  }

  notes.push({
    title,
    body,
  })
  saveNotes(notes)
  console.log(chalk.green('New note added.'))
}

const removeNote = function (title) {
  const notes = loadNotes()
  const hasNote = notes.some(function (note) {
    return note.title === title
  })
  if (!hasNote) {
    console.log(chalk.red('Note not available'))
    return
  }

  const updatedNotes = notes.filter(function (note) {
    return note.title !== title
  })
  saveNotes(updatedNotes)
  console.log(chalk.green('Note was successfully removed.'))
}

const listNotes = function () {
  const notes = loadNotes()
  if (notes.length > 0) console.table(notes)
  else console.log(chalk.red('No Notes to display.'))
}

const readNote = function (title) {
  const notes = loadNotes()
  const note = notes.find(function (note) {
    return note.title === title
  })
  if (!note) {
    console.log(chalk.red('Note not available'))
    return
  }

  console.log(chalk.green('Your Note'))
  console.log('Title: ' + note.title)
  console.log('Body: ' + note.body)
}

module.exports = { addNote, removeNote, listNotes, readNote }
