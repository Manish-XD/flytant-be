const Note = require('../models/note');

const NOTES_PER_PAGE = 5;

exports.getNotes = (req, res, next) => {
    const page = req.query.page;
    Note.find()
    .skip((page-1) * NOTES_PER_PAGE)
    .limit(NOTES_PER_PAGE)
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Failed to fetch Notes'});
    });
}

exports.getNote = (req, res, next) => {
    const noteId = req.params.noteId;
    Note.findById(noteId)
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Failed to fetch Note'});
    });
}

exports.addNote = (req, res, next) => {

    const note = new Note({});

    note
    .save()
    .then(result => {
        console.log(result._id);
        res.status(200).json({ id: result._id });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to create the Note' });
    });

}

exports.editNote = (req, res, next) => {

    const noteId = req.params.noteId;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;
    const updatedDate = Date.now();

    Note
    .findById(noteId)
    .then(note=>{
        note.title = updatedTitle;
        note.description = updatedDescription;
        note.date = updatedDate;
        return note.save();
    })
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({ error: 'Failed to update the Note' });
    });

}

exports.deleteNote = (req, res, next) => {

    const noteId = req.params.noteId;

    Note
    .findByIdAndDelete(noteId)
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to delete the Note' });
    });

}