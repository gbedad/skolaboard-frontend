import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


const  RegisterInfo = (props) => {
    const history = useHistory()

    const [show, setShow] = useState(true);
  
    return (
      <>
        <Modal.Dialog>
  <Modal.Header closeButton>
    <Modal.Title>Bienvenue sur SKOLABOARD : {props.userInfo.category === 'Beneficiary' ? "Bénéficiaire" : props.userInfo.category === 'Tutor' ? "Tuteur": "Géstionnaire"}</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p>Vous êtes bien enregistré avec l'adresse {props.userInfo.email} </p>
  </Modal.Body>

  <Modal.Footer>
    <Button onClick={()=> {
        history.push('/')
    }}variant="secondary">Fermer</Button>
    <Button onClick={()=> {
        history.push('/signin')
    }}
    variant="primary">Me connecter</Button>
  </Modal.Footer>
</Modal.Dialog>
</>
    );
  }
export default RegisterInfo
