import React, { useContext,useEffect, useRef,useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';
function Notes(props) {
    const context=useContext(NoteContext)
    const{notes,getNotes,updateNote}=context;
    const [note,setnote,] = useState({id:'', etitle:"",edescription:'',etag:''})
    const navigate= useNavigate();
    const onChange=(e)=>{
      setnote({...note, [e.target.name]:e.target.value});}
    useEffect(() => {
      if(localStorage.getItem('token'))
      {
        getNotes()
      }
      else{
        navigate('/login');
      }
      // eslint-disable-next-line
    },[])

    const handleClick=(e)=>{
      updateNote(note.id,note.etitle,note.edescription,note.etag)
      ref.current.click();
      e.preventDefault()
      setnote({etitle:"",edescription:'',etag:''})
      props.showAlert("Upadated Note successfully ",'success');
  }
    const ref =useRef(null)
    const refclose=useRef(null)
    
    //upadate a existing note
    const updatenote=(currentNote)=>{
      ref.current.click();
      setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
       
    }
  return (
    <div>   
<button ref={ref} type="button"  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-4">
   <label  className="form-label">Title</label>
   <input type="text" className="form-control"   onChange={onChange} required minLength={5} id="etitle"value={note.etitle} name="etitle" placeholder="Please Enter Title"/>
 </div>
 <div className="mb-3">
   <label  className="form-label">Description</label>
   <textarea className="form-control" id="edescription"  name="edescription" required minLength={5} onChange={onChange}value={note.edescription} rows="3" placeholder="Please Enter Description"></textarea>
 </div>
 <div className="mb-3"> 
   <label  className="form-label">Tag</label>
   <textarea className="form-control" id="etag"  name="etag" onChange={onChange} value={note.etag} rows="2" placeholder="Tag"></textarea>
 </div>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
        <AddNotes showAlert={props.showAlert}/>
        <h1>Saved Notes</h1> 
        {notes.length ===0 &&"There are no saved notes"}
    {
      notes.map((note)=>{
        return <NoteItem  key={note._id} updatenote={updatenote} note={note} showAlert={props.showAlert} />
      })
    }</div>
  )
}
export default Notes;