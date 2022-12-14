import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Login(props) {
  const [credential, setcredential] = useState({email:'', password:''})
  let navigate = useNavigate()
  const onChange=(e)=>{ 
    setcredential({...credential,[e.target.name]:e.target.value});
        }


  const handleSubmit= async(e)=>{
    e.preventDefault();
let url='http://localhost:5000/api/auth/login';
 const response = await fetch(url, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({email: credential.email, password: credential.password})
 });
   const json =await response.json();
   console.log(json);
   if(json.success){
    //redirect to login or unknown for ESM   account
    localStorage.setItem('token',json.token);
    props.showAlert("Logged In successfully ",'success');
    navigate('/')
   }
   else{
    props.showAlert("Invalid Credintials",'danger');

   }
  }
  return (
    <div>
     <form onSubmit={handleSubmit} >
      <h1> Login to continue with the IBook</h1>
  <div className="mb-3">
    <label htmlFor='email' className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onChange} value={credential.email} name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credential.password} id="password" name='password'/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login;