const express = require('express');
const Note = require('../models/Note');
const router = express.Router()
const fetchusers = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route:1 get all the notes by "get method" "/api/auth/getuser". login required
router.get('/fetchallnotes', fetchusers, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
res.status(500).send('some error has occurred');
    }
});

//Route:2 add a new  notes by "post method" "/api/auth/addnote". login required

router.post('/addnote', fetchusers, 
[body('title').isLength({ min: 4 }),
body('description', 'Enter Atleast 5 Character').isLength({ min: 5 }),
], async (req, res) => {
    try {
        
        const { title, description, tag, } = req.body;
        const errors = validationResult(req);
        //if any errors are encountered return bed request error    
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savenote=await note.save()
        res.json(savenote)
    } catch (error) {
        console.log(error.message);
res.status(500).send('some error has occurred');
    }
});
//Route:3 update an existing notes by "put method" "/api/auth/updatenote". login required
router.put('/updatenote/:id', fetchusers,async (req, res) => {
    try {
        
        const { title, description, tag, } = req.body;
        const newnote= {};
        if (title) newnote.title = title;
        if (description) newnote.description = description;
        if (tag) newnote.tag = tag;
        //find the id and update the note
        let note= await Note.findById(req.params.id)
        if(!note){return res.status(404).send('Not Found');}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send('unauthorized')
        }
        note= await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        // note = await Note.findOneAndUpdate({_id:req.params.id},{...newnote},{new:true});
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('some error has occurred');
    }
    })
//Route:4 delete notes by "delete method" "/api/auth/deletenote". login required
router.delete('/deletenote/:id', fetchusers,async (req, res) => {
    try {    
        //find the id and update the note
        let note= await Note.findById(req.params.id)
        if(!note){return res.status(404).send('Not Found');}
        //allow the note to be delete by authorised user
        if(note.user.toString()!==req.user.id){
            return res.status(401).send('unauthorized')
        }
        note= await Note.findByIdAndDelete(req.params.id);
        // note = await Note.findOneAndUpdate({_id:req.params.id},{...newnote},{new:true});
        res.json(note);
    } catch (error) {
        console.log(error.message);
res.status(500).send('some error has occurred'); 
    }
})
module.exports = router;