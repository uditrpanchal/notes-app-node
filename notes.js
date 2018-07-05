'use strict';

console.log('Starting notes.js');

const fs = require('fs');

/**
 * Fetch Notes
 */
var fetchNotes = () => {
	try {
		var noteString = fs.readFileSync('./playground/notes-data.json');

		return JSON.parse(noteString);
	} catch (e) {
		return [];
	}
};

/*
 * Saves the notes
 * @param {JSON Object} notes
 */
var saveNotes = notes => {
	fs.writeFileSync('./playground/notes-data.json', JSON.stringify(notes));
};

/*
 * Add Notes
 * @param {string} title
 * @param {string} body
 */
var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title: title,
		body: body,
	};

	var duplicateNotes = notes.filter(note => {
		return note.title === title;
	});

	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
	}
};

/*
 * Get All Notes
 */
var getAll = () => {
	console.log(fetchNotes());
};

/*
 * Get note by title
 * @param {string} title
 */
var getNote = title => {
	let allNotes = fetchNotes();
	let readFlag = 0;
	allNotes.forEach((data, index) => {
		if (data.title === title) {
			console.log(allNotes[index]);
			readFlag = 1;
		}
	});

	if (readFlag === 0) {
		console.log(`${title} doesnot exist`);
	}
};

/*
 * Remove note by title
 * @param {string} title
 */
var removeNote = title => {
	let notes = fetchNotes();
	let filteredNotes = notes.filter(note => {
		return note.title !== title;
	});
	saveNotes(filteredNotes);
};
/*
var removeNote = title => {
    let allNotes = fetchNotes();

    allNotes.forEach((data, index) => {
        if (data.title === title) {
            allNotes.splice(index, 1);
        }
    });

    if (allNotes.length !== 0) {
        saveNotes(allNotes);
    }
};
*/

module.exports = {
	addNote,
	getAll,
	removeNote,
	getNote,
};
