import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
function Signup(props) {
  const [cred, setcred] = useState({name:'', email:'', password:''})
  const navigate=useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault();
    let url='http://localhost:5000/api/auth/createuser';
     const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({name:cred.name, email: cred.email, password: cred.password})
     });
       const json =await response.json();
       if(json.success===true)
       { localStorage.setItem('Token',json.token);
       props.showAlert("Create Account successfully ",'success');
       navigate('/')
      }
      else{
        props.showAlert("Invalid Credintials",'danger');
      }
console.log(json);
  }
  const onChange=(e)=>{ 
    setcred({...cred,[e.target.name]:e.target.value});
        }
  return (
    <div>
      <form onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor='name' className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onChange} value={cred.name} name='name'required min={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor='email' className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onChange} value={cred.email} name='email'required min={5} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={cred.password} id="password"required min={5} name='password'/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Signup