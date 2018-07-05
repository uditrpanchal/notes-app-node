console.log('Starting notes.js');

const fs = require('fs');

//Fetch existing notes from notes-data.json and returns the JSON data object after converting from string.
var fetchNotes = () => {
    try {
        var noteString = fs.readFileSync('./playground/notes-data.json');

        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
};


//Saves the notes in string to notes-data.json
var saveNotes = (notes) => {
    fs.writeFileSync('./playground/notes-data.json', JSON.stringify(notes));
};


var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body,
    };

    var duplicateNotes = notes.filter(note => {
        return note.title === title;
    });

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
    }
};

var getAll = () => {
    console.log(fetchNotes());
};

var removeNote = title => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note)=>{
        return note.title !== title;
    });
    saveNotes(filteredNotes);
}
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

module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
};