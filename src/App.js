import React, {Component, useContext, useState} from 'react';
import  {TutorProvider} from './store/TutorContextProvider'
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Cookies from "js-cookie";

import Header from './assets/components/header/header'
import Home from './assets/components/home/home'
import Signin from './assets/components/signin-up/signin'
import Signup from './assets/components/signin-up/signup'
import AdminSettings from './containers/admin/admin'
import Beneficiary from './containers/beneficiary/beneficiary'
import ForgotPassword from './containers/forgotPassword';
import Tutor from './containers/tutor/tutor'


function App() {
const tokenFromCookie = Cookies.get("userToken");
const [userToken, setUserToken] = useState(tokenFromCookie || null);
const [user, setUser] = useState()
const [userInfo, setUserInfo] = useState({})


console.log(userToken)

  return (
    
    <Router>
      <TutorProvider>
      <Header userToken={userToken} setUserToken={setUserToken} user={user} setUser={setUser} />
      </TutorProvider>
  
      <Switch>
        <Route path='/signup'>
          <Signup setUserToken={setUserToken}/>
        </Route>
        <Route exact path='/admin'>
          <AdminSettings userToken={userToken}/>
        </Route>
        <Route exact path='/beneficiary'>
          <Beneficiary userToken={userToken} user={user}/>
        </Route>
        <Route exact path='/tutor'>
          <TutorProvider>
          <Tutor user={user} userToken={userToken} setUser={setUser} />
          </TutorProvider>
        </Route>
        <Route path='/signin'>
          <Signin  setUserToken={setUserToken} userToken={userToken} setUser={setUser} user = {user}/>
        </Route>
        <Route path = '/forgotPassword'>
          <ForgotPassword/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;