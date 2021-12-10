const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

// custom yargs version
yargs.version('1.1.0')

// yargs command

yargs.command({
  command : 'add',
  describe : 'Adding a note!',
  builder : {
    title : {
      describe : 'Notes title',
      demandOption : true,
      type : 'string'
    },
    summary : {
      describe : "description of note",
      demandOption : true,
      type : 'string'
    }
  },
  handler : function (argv) {
    notes.addNote(argv.title,argv.summary)
  }
})

yargs.command({
  command : 'remove',
  describe : 'Removing a note !',
  builder : {
    title: {
      describe : 'note title',
      demandOption : true,
      type : 'string'
    }
  },
  handler : function (argv) {
    notes.removeNote(argv.title)
  }
})

yargs.command({
  command : 'list',
  describe : 'list of notes',
  handler : function (argv) {
    notes.listNotes()
  }
})

yargs.command({
  command : 'read',
  describe : 'read a note',
  builder : {
    title : {
      describe : 'notes title',
      demandOption : true,
      type : 'string'
    }
  },
  handler : function (argv) {
    notes.readNotes(argv.title)
  }
})

yargs.parse()