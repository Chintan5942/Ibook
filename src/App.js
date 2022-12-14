import React,{useState} from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import About from './component/About';
import Alert from './component/Alert';
import Home from './component/Home';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Signup from './component/Signup';
import NoteState from './context/notes/NoteState';
export default function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
    <NoteState>
  <BrowserRouter>
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container">
    <Routes>
      <Route path='/' element={<Home showAlert={showAlert}/>}>
      </Route>
      <Route path='/login' element={<Login showAlert={showAlert}/>}>
      </Route>
      <Route path='/signup' element={<Signup showAlert={showAlert}/>}>
      </Route>
      <Route path='/about' element={<About/>}> 
      </Route>
    </Routes>
    </div>
  </BrowserRouter>
    </NoteState>
    </>
  )
}
