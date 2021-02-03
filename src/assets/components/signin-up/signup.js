import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns';
import CardGroup from 'react-bootstrap/CardGroup';
import Alert from 'react-bootstrap/Alert'

import RegisterInfo from '../../../containers/registerInfo'

const SignUp = ({ setUserToken }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [validated, setValidated] = useState(false);
  const [disableFormBeneficiary, setDisableFormBeneficiary]=useState(false)
  const [disableFormTutor, setDisableFormTutor]=useState(false)
  const [show, setShow] = useState(true);
const [data, setData] = useState({})

  const history = useHistory();


  
  

  const handleSubmitBeneficiary = async (event) => {
    
    const form = event.currentTarget;
    
    if (form.checkValidity() === true) {
     
      event.preventDefault();
      event.stopPropagation();
      
    }
    setValidated(true);
    
 try {
      if (password === confirmPassword) {
        const response = await axios.post(
          "https://skolaboard-app.herokuapp.com/api/beneficiary/register",
          { email: email, name: name, lastname: lastname, password: password }
        );
       
        setUserToken(response.data.token);
        Cookies.set("userToken", response.data.token, { expires: 300 });
setData(response.data)
       // history.push('/signin');
        console.log(response.data)
        
       
        //history.push('/')
        
      } else {
        alert("Veuillez saisir deux passwords identiques");
      }
}
catch (error) {
 
  alert(error.message)
}
  };

  const handleSubmitTutor = async (event) => {
    
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    
    /* event.preventDefault(); */
    

    try {
      
      if (password === confirmPassword) {
        const response = await axios.post(
          "https://skolaboard-app.herokuapp.com/api/tutor/register",
          { email: email, name: name, lastname: lastname, password: password }
        );
        setUserToken(response.data.token);
        Cookies.set("userToken", response.data.token, { expires: 300 });
        setData(response.data)
        
        
        //history.push("/signin");
        console.log(response.data)
      } else {
        alert("Veuillez saisir deux passwords identiques");
      }
  }
  catch (error) {
    console.log("i am on catch")
    alert(error.message)
  }
  };
  if (data.error===null) {
    return  <RegisterInfo userInfo = {data.data}/>
   }
  
          

  return (
    <div style={{margin: 'auto'}}>
      <div className="pourquoi">
    
      
      </div>
      <br/>
      
{/* <Container fluid = 'md'>
        <Row className="justify-content-md-center">
          <Col sm> */} 
          <Container fluid='md'>
            
            
     <Row  >
          <Col className="justify-content-md-center" lg = {true} style={{width:'20rem', margin : 'auto'}}>
            <Card >
              <Card.Body>
                <Card.Header as='h5'>Inscription bénéficiaire</Card.Header>
                <Form  validated = {validated} onSubmit={handleSubmitBeneficiary} >
                  
<fieldset disabled={disableFormBeneficiary}>
                  
                 
                <Form.Group  controlId="validationCustom01">
  {/* <Form.Label >First name</Form.Label> */}
          <Form.Control
          
          size='sm'
            required
            type="text"
            placeholder="First name"
            onChange={({target}) => {
              setName(target.value);
              
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validationCustom02">
          {/* <Form.Label >Last name</Form.Label> */}
          <Form.Control
          size='sm'
            required
            type="text"
            placeholder="Last name"
            onChange={({target}) => {
              setLastname(target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">  
    {/* <Form.Label >Email address</Form.Label> */}
    <Form.Control size='sm' type="email" placeholder="Enter email" onChange={({target}) => {
                    setEmail(target.value);
                  }}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword01">
    {/* <Form.Label>Password</Form.Label> */}
    <Form.Control size='sm' type="password" placeholder="Password" onChange={({target}) => {
                    setPassword(target.value);
                  }}/>
  </Form.Group>
  <Form.Group controlId="formBasicPassword02">
    {/* <Form.Label >Confirm Password</Form.Label> */}
    <Form.Control required size='sm' type="password" placeholder="Confirm Password" onChange={({target}) => {
                    setConfirmPassword(target.value);
                  }} />
  </Form.Group>
  
  <Form.Group>
        <Form.Check
        required
        onChange={() => {
          setCheckbox1(!checkbox1);
          if(checkbox1===false) {
            setDisableFormTutor(true)
          }
          else {
            setDisableFormTutor(false)
          }

        }}
        
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
      <Button type="submit">Je crée mon compte</Button>
      </fieldset>
   </Form> 
                {/* <div className="create">
          <form onSubmit={handleSubmitBeneficiary}>
            <div className="modalTitle">
              <span>Créez un compte bénéficiaire</span>
            </div>

            <div className="input-field">
              <div>
                <span>Prénom *</span>
                <input
                  type="text"
                  name="name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  placeholder="Prénom"
                  required
                />
              </div>

              <div>
                <span>Nom *</span>
                <input
                  type="text"
                  name="lastname"
                  onChange={(event) => {
                    setLastname(event.target.value);
                  }}
                  placeholder="Nom de famille"
                  required
                />
              </div>

              <div>
                <span>email *</span>
                <input
                  type="email"
                  name="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  placehaolder="Email"
                  required
                />
              </div>

              <div className="password">
                <div>
                  <span>Password *</span>
                  <input
                    type="password"
                    name="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    placeholder="Password"
                    required
                  />
                </div>

                <div>
                  <span>Confirm password *</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="checked">
                <input
                  type="checkbox"
                  name="check"
                  onChange={() => {
                    setCheckbox(!checkbox);
                  }}
                  required
                />
                <p>
                  « J’accepte les{" "}
                  <span>
                    Conditions Générales
                    d’Utilisation
                  </span>{" "}
                  »
                </p>
              </div>
            </div>

            <div className="submit">
              <button type="submit">Créer mon Compte Personnel</button>
            </div>
          </form>
        </div> */}
             </Card.Body>
            </Card> 
            </Col>
 
{/*           </Col>
          <Col sm> */}
          <Col lg ={true} style={{width:'20rem' , margin : 'auto'}}>
            <Card >
<Card.Body>

<Card.Header as='h5'>Inscription tuteur</Card.Header>
         
          <div className="create">
          <Form validated={validated} onSubmit={handleSubmitTutor}>
            <fieldset disabled={disableFormTutor}>

          <Form.Group  controlId="validationCustom01">
  {/* <Form.Label >First name</Form.Label> */}
          <Form.Control
          size='sm'
            required
            type="text"
            placeholder="First name"
            onChange={({target}) => {
              setName(target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom02">
          {/* <Form.Label >Last name</Form.Label> */}
          <Form.Control
          size='sm'
            required
            type="text"
            placeholder="Last name"
            onChange={({target}) => {
              setLastname(target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicEmail01">  
    {/* <Form.Label >Email address</Form.Label> */}
    <Form.Control required size='sm' type="email" placeholder="Enter email" onChange={({target}) => {
                    setEmail(target.value);
                  }}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword01">
    {/* <Form.Label>Password</Form.Label> */}
    <Form.Control required size='sm' type="password" placeholder="Password" onChange={({target}) => {
                    setPassword(target.value);
                  }}/>
  </Form.Group>
  <Form.Group controlId="formBasicPassword02">
    {/* <Form.Label >Confirm Password</Form.Label> */}
    <Form.Control required size='sm' type="password" placeholder="Confirm Password" onChange={({target}) => {
                    setConfirmPassword(target.value);
                  }} />
  </Form.Group>
  
  <Form.Group>
        <Form.Check
        onChange={() => {
          setCheckbox2(!checkbox2)  
          if(checkbox2===false) {
            setDisableFormBeneficiary(true)
          }
          else {
            setDisableFormBeneficiary(false)
          } 
        }}
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
      <Button type="submit">Je crée mon compte</Button>
      </fieldset>
   </Form>
              
   
        </div>
        </Card.Body>
        </Card>

         
          </Col>
          </Row>
{/*     </Col>
        </Row>
      </Container>  */}
      </Container>
      <div className="form">
        

        
        

      </div>
    </div>
  );
};

export default SignUp;