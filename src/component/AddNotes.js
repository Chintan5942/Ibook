import React,{useContext,useState} from 'react'
import NoteContext from '../context/notes/NoteContext';
function AddNotes(props) {
    const context=useContext(NoteContext)
    const{addNote}=context;
    const [note, setnote] = useState({title:"",description:'',tag:'default'})
    const handleClick=(e)=>{
        e.preventDefault()
      addNote(note.title,note.description,note.tag)
      setnote({title:"",description:'',tag:''})
      props.showAlert("Create Note successfully ",'success');
    }
    const onChange=(e)=>{ 
setnote({...note, [e.target.name]:e.target.value});
    }
  return (
    <div> <div className='container'>
    <h1>Add Notes</h1>
    <div className="mb-4">
   <label  className="form-label">Title</label>
   <input type="text" className="form-control"  onChange={onChange} value={note.title} id="title" minLength={5} required name="title" placeholder="Please Enter Title"/>
 </div>
 <div className="mb-3">
   <label  className="form-label">Description</label>
   <textarea className="form-control" id="description" value={note.description} name="description" minLength={5} required onChange={onChange} rows="3" placeholder="Please Enter Description"></textarea>
 </div>
 <div className="mb-3">
   <label  className="form-label">Tag</label>
   <textarea className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} rows="2" placeholder="Tag"></textarea>
 </div>
 <div className="col-auto">
     <button type="submit" disabled={note.title.length<5||note.description.length<5} className="btn btn-primary mb-3"  onClick={handleClick}>Add Note</button>
   </div>
 </div></div>
  )
}

export default AddNotes;