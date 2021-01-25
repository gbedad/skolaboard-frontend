import React, {useEffect, useState} from 'react';
import axios from 'axios';

// import Bootstrap
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';

import './tutor.css';



const TutorFiles = (userInfo) => {
  const [file1, setFile1]=useState();
  const [file2, setFile2]=useState();
  const [file3, setFile3]=useState();
  const [downloaded, setDownloaded]=useState({});
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [userDocuments, setUserDocuments]=useState();
  const [id, setId]=useState(false);
  const [cv, setCv]=useState(false);
  const [crim, setCrim]=useState(false);
  const [change, setChange] = useState(false);
  const [validated, setValidated]=useState(false);


useEffect(()=> {
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://192.168.0.31:3000/api/tutor/' + userInfo.userInfo.id)

      console.log(response.data)
     setUserDocuments(response.data.documents)
     if (response.data.documents.IDCard) {
      setId(true);
    }
    if (response.data.documents.Curriculum) {
      setCv(true)
    }
    if (response.data.documents.CriminalRecord) {
      setCrim(true)
    }

    }
    catch (error) {
      console.log(error.message)
    }


  }
  fetchUserDetails()

}, [userDocuments, file1, file2, file3])
  
    const formData = new FormData();
    formData.append("IDCard", file1);
    formData.append("Curriculum", file2);
    formData.append("CriminalRecord", file3);

    console.log(formData.has("CriminalRecord"), formData.has("IDCard") , formData.has("Curriculum"))


  const handleUploadFiles = async (event) => {

    event.preventDefault() 
const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if(formData.has("CriminalRecord")|| formData.has("IDCard") || formData.has("Curriculum")) {
    try {

  const response = await axios.put('http://192.168.0.31:3000/api/tutor/settings/update/'+userInfo.userInfo.id, formData,

        {
          headers: {
            Authorization: "Bearer " + userInfo.userInfo.token,
           /* "content-Type": "multipart/form-data;" */
           "Content-Type": "application/json; charset=utf-8",     
          },
          
        })
        console.log(response.data)
        setChange(true)
        //console.log(file2)
 
    }
    catch (error) {
      console.log(error.message)
    }
  }
 } 


  // Download Chart of Volunteer
useEffect(()=> {
  const fetchFile = async () => {
    /* event.preventDefault() */
   
     try {
       const response = await axios.get('http://192.168.0.31:3000/api/files/')
   if (response) {
     alert(JSON.stringify(response.data))
     console.log(response.data)
     setDownloaded({name:response.data[0].name, url:response.data[0].url})
     setIsDownloaded(true)
     
   }
     }
     catch (error) {
       console.log(error.message)
     }
   }
   fetchFile()
}, [])


    return (
        <div style = {{margin:'auto', paddingTop:'15px', display:'flex', justifyContent:'flex-end'}}>
            <Container fluid='xl'>       
                <Row >
                    <Col lg={true}>
                    <Card style={{ width: '22rem', height:'255px' }} className='card_style'>
                      <div className='card_header'>
                      <Card.Title as = 'h6'>Ma pièce d'identité</Card.Title>
                      </div>
  
                      <Card.Body>
                        <Card.Text>
                          La copie d'une pièce d'identité (CNI ou passeport) est à déposer ici.
                        </Card.Text>

                      </Card.Body>
                      <footer style ={{height:'50px'}}>
                        
                        <Form.File id="formcheck-api-regular">
                          <Form.File.Input
                          onChange={(event) => setFile1(event.target.files[0])}
                          />
                        </Form.File>

                        </footer>
                    </Card>
                    </Col>
                    <Col lg={true}>
                    <Card style={{ width: '22rem', height:'255px' }} className='card_style'>
                      <div className= 'card_header'>
                      <Card.Title as = 'h6' >Mon C.V.</Card.Title>
                      </div>
  
                      <Card.Body>
                        <Card.Text>
                          Le curriculum vitae (ou attestation de diplôme) est à déposer ici.
                        </Card.Text>
                        
                      </Card.Body>
                      <footer style ={{height:'50px'}}>
                        
                        <Form.File id="formcheck-api-regular">
                          <Form.File.Input
                          onChange={(event) => setFile2(event.target.files[0])}
                          />
                        </Form.File>

                        </footer>
                    </Card>
                    </Col>
                    <Col lg={true}>
                    <Card style={{ width: '22rem', height:'255px'}} className='card_style'>
                      <div className='card_header'>
                      <Card.Title as ='h6' >Mon extrait de casier judiciaire</Card.Title>
                      </div>
  
                      <Card.Body>
                        <Card.Text>
                          Le bulletin n°3 de l'extrait de casier judiciaire est à déposer ici.
                        </Card.Text>
                      </Card.Body>
                      <footer style ={{height:'50px'}}> 
                        <Form.File id="formcheck-api-regular">
                          <Form.File.Input
                          onChange={(event) => setFile3(event.target.files[0])}
                          />
                        </Form.File>
                        </footer>
                    </Card>
                    </Col>
                </Row>

                <Row>
                  <Col lg={true}>
                  <Card  style={{ width: '22rem', height:'255px' }} className='card_style'>
                    <div className='card_header'>
                    <Card.Title as='h6'> Télécharger la charte de bénévolat
                    </Card.Title>
                    </div>
                    <Card.Body>
                    
                      <Card.Text>
                        La charte de bénévolat de l'association Séphora Berrebi est à télécharger ci-dessous pour prise de connaissance.
                      </Card.Text>
                      {!isDownloaded ? (<span>Attente...</span>):(
                        <Card.Link href={downloaded.url}>Charte de bénévolat</Card.Link>
                      )}
                    </Card.Body>
                    <Row>
                    </Row>
                  </Card>
                  </Col>
                  <Col lg={true}>
                    <Card style={{ width: '22rem', height:'255px' }} className='card_style'>
                      <div className='card_header'>
                      <Card.Title as ='h6' >Ma charte de bénovolat signée</Card.Title>
                      </div>
  
                      <Card.Body>
                        <Card.Text>
                          La convention d'engagement réciproque qui se trouve après la charte est à signer puis à déposer ici.
                        </Card.Text>
                      </Card.Body>
                      <footer style ={{height:'50px'}}>
                        
                        <Form.File id="formcheck-api-regular">
                          <Form.File.Input disabled
                          onChange={(event) => setFile2(event.target.files[0])}
                          />
                        </Form.File>

                        </footer>
                    </Card>
                    </Col>
                  <Col lg={true}>
                  <Card style={{ width: '22rem', height:'255px' }} className='card_style'>
                    <div className='card_header'>
                      <Card.Title as = 'h6'>Mes documents déposés</Card.Title>
                    </div>
                    <Card.Body>
                      <Form>
                        <Form.Check 
                        type='checkbox'
                        label="Ma pièce d'identité"
                        checked = {id}
                        />
                        <Form.Check
                        type='checkbox'
                        label= "Mon C.V." 
                        checked = {cv}
                        />
                        <Form.Check
                        type='checkbox'
                        label= "Mon extrait de casier judiciaire" 
                        checked = {crim}
                        />
                        <Form.Check
                        type='checkbox'
                        label= "Ma charte de bénévolat signée"
                        checked = {false}
                        disabled
                        />
                      </Form>
                    </Card.Body>
                  </Card>
                  </Col>
                </Row>
                <Container fluid='md' style = {{height:'5rem', display:'flex', justifyContent:'center'}}>
                <Row>
                  <Form validated={validated} onSubmit={handleUploadFiles}>
                    <Button type='submit'>Je sauvegarde</Button>
                  </Form>
                </Row>
                </Container>
            </Container>
            
        </div>
    )
}

export default TutorFiles
