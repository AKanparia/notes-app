const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes.js')

// Customise yargs
yargs.version('1.1.0')

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body)
  },
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove note',
  builder: {
    title: {
      describe: 'Note title to remove',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title)
  },
})

// Create list command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: function () {
    notes.listNotes()
  },
})

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read note',
  builder: {
    title: {
      describe: 'Note title to read body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.readNote(argv.title)
  },
})

yargs.parse()
