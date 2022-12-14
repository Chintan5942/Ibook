import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';
function NoteItem(props) {
  const context=useContext(NoteContext)
    const{deleteNote}=context;
    const {note,updatenote} = props;
  return (
      <div className="card my-3">
  <div className="card-header ">
   { note.title }
   <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}>
        </i> 
        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id,props.showAlert("Deleted Note successfully ",'danger')) }}></i>
  </div>
  <div className="card-body">
    <blockquote className="blockquote mb-0">
      <p>{note.description}</p>
      <footer className="blockquote-footer">{note.tag }</footer>
    </blockquote>
    <div className="container  " style={{marginLeft:"97%"}}>
      </div>
  </div>
</div>
  )
}
export default NoteItem;


