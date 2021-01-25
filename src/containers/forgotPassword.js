import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'



const ForgotPassword = () => {

    const history = useHistory();

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [response, setResponse]=useState(null)

    const handleSubmit = async (event) =>  {
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
      console.log(email)
      try {
          
        const resp = await axios.put('http://192.168.0.31:3000/api/recover_password', {email})
     console.log(response)
     setResponse(resp)
     /* if (response) {
         AlertDismissible()
        
     } */
     

      }
      catch(error) {
          return error.message
      }
    };

    function AlertDismissible() {
        const [show, setShow] = useState(true);
      
        return (
          <>
            <Alert show={show} variant="success">
              <Alert.Heading>Message API SKOLABOARD</Alert.Heading>
              <p>
                Nous vous avons envoyé un email à l'adresse mentionnée avec un lien pour réinitialiser votre mot de passe.
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={() => history.push("/signin")} variant="outline-success">
                  Fermer
                </Button>
              </div>
            </Alert>
      
            {!show && <Button onClick={() =>  setShow(false)}>Show Alert</Button>}
          </>
        );
      } 

    return (
        <div>{!response ?(
<Form  validated = {validated} onSubmit = {handleSubmit}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control required type="email" placeholder="Enter email" onChange={({target})=> setEmail(target.value)}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        ):(
<AlertDismissible/>
        )}
            

        </div>
    )
}

export default ForgotPassword
