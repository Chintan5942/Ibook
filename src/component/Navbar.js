import React from 'react'
import {Link,useLocation,useNavigate} from "react-router-dom";
function Navbar() {
let location = useLocation();
const navigate = useNavigate();
const handleLogout=()=>{
  localStorage.removeItem('token');
  navigate('/login');
}  
  return (
   <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <Link className="navbar-brand" to="/">Ibook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/" ? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about" ?"active":""}`} aria-current="page" to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className="btn btn-primary mx-1" to="/login" role="button" >Login </Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button" >Signup</Link></form>
        :<form className="d-flex" role="search"> 
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
       <button className="btn btn-primary mx-1"  onClick={handleLogout} role="button">Logout</button> </form>}
    </div>
  </div>
</nav> 
  )
}

export default Navbar