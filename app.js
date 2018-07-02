console.log("Starting app.js")

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;

const command = process.argv[2];
const title = argv.title;
const body = argv.body;


if (command === 'add') {
    notes.addNote(title, body);
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    notes.getNote(title);
} else if (command === 'remove') {
    notes.removeNote(title);
} else {
    console.log('Command not recognized');
}