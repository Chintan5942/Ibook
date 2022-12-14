import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial)
    const getNotes = async () => {
        let url = `${host}/api/notes/fetchallnotes`;
        // console.log(url);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        // console.log(json);
        setnotes(json)
    }
    // add notes
    const addNote = async (title, description, tag) => {
        //add note and fetch api 
        let url = `${host}/api/notes/addnote`;
        console.log(localStorage.getItem('token'));
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json()
        setnotes(notes.concat(note))
        getNotes();
    }
    //delete notes
    const deleteNote = async (id) => {
        //api call
        let url = `${host}/api/notes/deletenote/${id}`;
        // console.log(url);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        console.log(localStorage.getItem('token'));
    
        const newnotes = notes.filter((not) => { return not._id !== id })
        setnotes(newnotes)
        getNotes();

    }
    //update notes
    const updateNote = async (id,title, description, tag,) => {
        //fetch backend data
        let url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag})
        });
        // const json = response.json();
        // console.log(response);

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
        getNotes();

    }
    return (
        <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;