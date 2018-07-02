console.log('Starting notes.js');

const fs = require('fs');

var addNote = (title,body) => {

    var notes = [];
    var note = {
        title,
        body
    };

    try{
        var noteString = fs.readFileSync('./playground/notes-data.json');
        notes = JSON.parse(noteString);
    }catch(e){
        console.log('file is empty')
    }

    var duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });

    if(duplicateNotes.length === 0){
        notes.push(note);
        fs.writeFileSync('./playground/notes-data.json', JSON.stringify(notes));
    }
    
};

var getAll = () => {
    var allNotes = fs.readFileSync('./playground/notes-data.json');
    console.log(JSON.parse(allNotes));
};

var removeNote = (title) => {
    let allNotes = JSON.parse(fs.readFileSync('./playground/notes-data.json'));
    
    allNotes.forEach((data,index) => {
        if(data.title === title){
            allNotes.splice(index,1);
        }
    });

    if(allNotes.length !== 0){
        fs.writeFileSync('./playground/notes-data.json', JSON.stringify(allNotes));
    }
};

var getNote = (title) => {
    let allNotes = JSON.parse(fs.readFileSync('./playground/notes-data.json'));
    let readFlag = 0;
    allNotes.forEach((data,index) => {
        if(data.title === title){
            console.log(allNotes[index]);
            readFlag = 1;
        }
    });

    if(readFlag === 0){
        console.log(`${title} doesnot exist`);
    }
};

module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote
};