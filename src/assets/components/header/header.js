import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation} from 'react-router-dom';
import {useTutor} from '../../../store/TutorContextProvider';
import Cookies from "js-cookie";

import {FcCollaboration} from 'react-icons/fc'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// Import files
import './header.css'

const  Header =({userToken, setUserToken, user})=> {
  const [click, setClick] = useState(false);
const history=useHistory();
const location = useLocation()



  const handleClick = () => setClick(!click);
  const closeMobileMenu = ()=> setClick(false);

 useEffect(()=> {
    //const userLogged = JSON.parse.localStorage.getItem('currentUser')
    //console.log('userLogged', userLogged)

  },[])
    return (
      <>
        {/* <div className='header'>
        <div className='logo-container'>
<a href='#'>
  <FcCollaboration className='logo'/>
</a>
            </div>
          <div className='logo-nav'>

          <ul className='{click ? "nav-options active" : "nav-options"}'>
          <li className='option' onClick={closeMobileMenu}>
            <Link to="/" className='option'>A propos</Link>
          </li>
          </ul>
{/*          <ul className='signin-up'>
          <li className='sign-up'>
            <Link to="/signup" className='sign-up'>S'inscrire</Link>
          </li>
          <li className='sign-in'>
            <Link to="/signin" className='sign-in'>Se connecter</Link>
          </li>
        </ul>  
          </div>
          <div className='signin-up'>
            <div>
          <button
              className="announce"
              onClick={() => {
                history.push("/signup");
              }}
            >
              Inscription
            </button>
            </div>
            <div>
          {!userToken ? (
            <button
              className="announce"
              onClick={() => {
                history.push("/signin");
              }}
            >
              Connexion
            </button>
          ) : (
            <button
              onClick={() => {
                // when clicking on button, disconnect and remove cookie
                Cookies.remove("userToken");
                setUserToken(null);
                history.push("/");
              }}
            >
              Se deconnecter
            </button>
          )}
          </div>
        </div>
        </div> */}
     
       <Navbar bg="light" expand = "lg" sticky ="top">
<Navbar.Brand href='/home'>
  SKOLABOARD
</Navbar.Brand>
<Navbar.Toggle aria-controls='basic-navbar-nav' />
<Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="justify-content-end">
      {!userToken ? 
      (<Nav.Link onClick={() => {

                history.push("/signup");
              }} >Inscription</Nav.Link>):(<Nav.Link onClick={() => {

                history.push("/signup");
              }} disabled>Inscription</Nav.Link>)

            }
               {!userToken ? (
      <Nav.Link onClick={() => {
                history.push("/signin");
              }}>Connexion</Nav.Link>):(
                <Nav.Link onClick={() => {
                  // when clicking on button, disconnect and remove cookie
                  Cookies.remove("userToken");
                  localStorage.clear()
                  setUserToken(null);
                  history.push("/");
                }}>Se déconnecter</Nav.Link>

              )}
      </Nav>
      {userToken ? (<Navbar.Text >
Signed in as : <a href='/signin'></a> 
      </Navbar.Text>):(<Navbar.Text></Navbar.Text>)}
      
      </Navbar.Collapse>
        </Navbar>
</>
    )
}

export default Header