import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from "js-cookie";
import { useHistory, useLocation, Link } from "react-router-dom";
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useForm} from "react-hook-form";

import '../signin-up/signin.css'
import ForgotPassword from '../../../containers/forgotPassword'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Card } from 'react-bootstrap';

const Signin = ({setUserToken, setUser, user, userToken}) => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [user, setUser] = useState();
    const [message, setMessage]=useState()
    const { register, errors} = useForm();

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event )=> {
      const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
        
  console.log(email)      
const user_det = {email, password};
try {

    const response = await axios.post("http://192.168.0.31:3000/api/login", user_det);
    console.log('response from back', response.data);
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      localStorage.setItem('currentUserToken', JSON.stringify(response.data.token));
      console.log("user data from back", response.data)
      setUser(response.data);
      setUserToken(response.data.token);
      Cookies.set("userToken", response.data.token, { expires: 300 });

if (response.data.category.toLowerCase() === "admin") {
  history.push('/admin')
}
if (response.data.category.toLowerCase() === "beneficiary") {
  history.push('/beneficiary')
}
if (response.data.category.toLowerCase() === 'tutor') {
  history.push('./tutor', {user:response.data})
}

//history.push('/admin')
/* if (response.data.category === 'beneficiary' ) {
  history.push("/beneficiary", {id: user.id, email: user.email, name: user.name, lastname:user.lastname});
}
else if (user.category === 'tutor') {
  history.push("/tutor", {id: user.id, email: user.email, name: user.name, lastname:user.lastname});
}
else if (response.data.category === 'admin') {
  history.push("/admin", {id: user.id, email: user.email, name: user.name, lastname:user.lastname});
} */

}
catch(err) {
    return {err}
}

    }
    
/*     const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
      }; */
      
/* 
    if (user) {
        return (<div>Bonjour {user.name} !
        <br/>
        <span>Voici vos identifiants :</span>
        <br/>
        <span>id : {user.id}</span>
        <br/>
        <span>email : {user.email}</span>
        <br/>
        <span>username : {user.name} {user.lastname}</span>
        <br/>
        <span>category : {user.category}</span>
        <div>
            <button onClick={()=> {
if (user.category === 'beneficiary' ) {
    history.push("/beneficiary", {id: user.id, email: user.email, name: user.name, lastname:user.lastname});
}
else if (user.category === 'tutor') {
    history.push("/tutor", {id: user.id, email: user.email, name: user.name, lastname:user.lastname});
}
else if (user.category === 'admin') {
    history.push("/admin", {id: user.id, email: user.email, name: user.name, lastname:user.lastname});
}
            }}>Aller sur ma page</button>
        </div>
    
        </div> )
    } */
 
  
  
    return (
        <div>
        {/* <form onSubmit={handleSubmit}>
            <label htmlFor="email">Username : </label>
            <input
            type="text"
            value={email}
            placeholder="Entrez votre email"
            onChange={({target})=> setEmail(target.value)}/>
            <div>
                <label htmlFor="password">password : </label>
                <input
                type= "password"
                value={password}
                placeholder="Mot de passe"
                onChange={({target})=> setPassword(target.value)}/>
            </div>
            <button type="submit" className="btn">Se connecter</button>

        </form> */}
       
         <br/>
          <Container >
            <Row>
              <Col sm = {{span:6, offset:3}}>
                <Card>
                  
                  <Card.Body>

                  <Card.Header as ='h5'>Login</Card.Header>

              <Form noValidate onSubmit={handleSubmit}>
              <Form>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={({target})=> setEmail(target.value)}/>
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={({target})=> setPassword(target.value)}/>
  </Form.Group>
</Form>
      
      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
      <Button type="submit">
S'identifier</Button>
    </Form>
    </Card.Body>
    </Card>
              </Col>
            </Row>
          </Container>
          <div className='forgotPassword'>
            <span>Vous avez oublié votre mot de passe ? <Link to = '/forgotPassword'> Cliquer ici</Link></span>
            
          </div>
          
       </div> 
    )

}

export default Signin
