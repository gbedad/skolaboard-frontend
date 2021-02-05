import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { Dots, Windmill, Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import 'react-activity/lib/Spinner/Spinner.css';

// Bootstrap
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion'

import TutorProfile from './tutor_profile'
import './tutor.css'
import TutorAvailability from './tutorAvailability';
import TutorFiles from './TutorFiles';

import avatar from "../../../src/assets/images/avatar.jpg"
import { useTutor } from '../../store/TutorContextProvider';

const Tutor = (user,userToken) => {
  const location = useLocation();
  const [userNew, setUserNew]=useState()
    const [key, setKey] = useState('home');
    const [isLoading, setIsLoading]=useState(true)
    const [userId, setUserId] = useState()
    const userSettings = JSON.parse(localStorage.getItem('currentUser'));
    const userSettingsUpdate = JSON.parse(localStorage.getItem('updatedcurrentUser'));
    const userPicture = JSON.parse(localStorage.getItem('updatePicture'));
    const [pictureId, setPictureId]=useState();
    const {state, dispatch} = useTutor();
    //const {picture, tutor, updatedAt} = state.form;
    const [pictureloaded, setPictureLoaded]= useState(true);

    
    //const userSettingsUpdate = JSON.parse(localStorage.getItem('updatedcurrentUser'));

 console.log('first request',userPicture)
console.log(state)
const tutorId=userSettings.id;
 //setUserNew(userSettings)
 //console.log('second request',userSettingsUpdate)
/* 
 const user = location.state  */
useEffect(() => {
   const fetchUser = async ()=> {
   
    try {   
      if (tutorId) {
        const response = await axios.get(`https://skolaboard-app.herokuapp.com/api/tutor/${tutorId}`)
            console.log('Am I satisfied ? ',response.data)
            if (response.data) {
              localStorage.setItem('updatedcurrentUser', JSON.stringify(response.data));
              setUserNew(response.data);
              if (response.data.picture.secure_url) {
                setPictureId(response.data.picture.secure_url);
                setPictureLoaded(false);
              }
            }
    
      }
      else {
        setUserNew(userSettings)
      }

    }
    catch (error) {
      console.log(error.message)
    }
    setIsLoading(false)
   }
fetchUser()
 }, [userSettings.id])
 console.log('after',userSettings, userNew)

 //const store = JSON.parse(localStorage.getItem('updatedcurrentUser'))
//console.log('with localstorage ,',store) 
//console.log(pictureId) 



//const newPicture = JSON.parse(localStorage.getItem('updatedPicture'));

//console.log(newPicture)
    //const [user, setUser]=useState({})
  
/*   console.log('from tutor.js? ', user)
if (user) {
  console.log("j'affiche la valeur :",user)
}
else {
  console.log("pas trouvé")
} */

  // console.log(token)
    return (
      isLoading ? (
        <span>Loading...</span>
      ):(
<div >
  <div style={{marginLeft:"20px", marginTop:'20px'}}>
            {/* <h4>Profil Tuteur</h4>
            <br/> */}
  </div>
  <div style={{display:'flex', flexDirection:'row', flexWrap:"wrap", justifyContent:'flex-end'}}>
    
 
      <Col xs={12} sm={12} md={2} lg={2}>
      
          <Row>
            <Col >
              <Col >
                {/* {picture ?(<img src={picture} style={{width:'100px', height:'100px', borderRadius:'50px', objectFit:'cover'}}/>):(<img src={avatar} style={{width:'100px', height:'100px', borderRadius:'50px', objectFit:'cover'}}/>) } */}
                <Row style={{alignItems:'center'}}>
                {pictureloaded === true ? <img src={avatar} style={{width:'4rem', height:'4rem', borderRadius:'2rem', objectFit:'cover'}}/>: pictureloaded ? <Spinner style={{size:20}}/>: (<img src={pictureId} style={{width:'4rem', height:'4rem', borderRadius:'2rem', objectFit:'cover'}}/>)}
                </Row>
                <div>
                <span></span>
                </div>
              </Col>
           
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="/home">Mon dashboard</Nav.Link>
                {/* <Nav.Link eventKey="link-1">Mes étudiants</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
                <Nav.Link eventKey="disabled" disabled>
                  Disabled
                </Nav.Link> */}
              </Nav>
            
{/*               <Row>Mon Dashboard</Row>
              <Row>Mes étudiants</Row> */}
            </Col>
          </Row>
      
      </Col>
    
      <Col xs={12} sm={12} md={10} lg={10}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)} 
        >
        <Tab eventKey="profile" title="Je complète mon profil" style={{border:'none'}}>
            <TutorProfile userInfo={userSettings} userDetails={userNew} userId={userSettings.id} token={userSettings.token} /> 
        </Tab>
        <Tab eventKey="availabilities" title="Je donne mes disponibilités">
            <TutorAvailability userInfo={userSettings} token = {userSettings.token}/>
        </Tab>
        <Tab eventKey="files" title="Je dépose mes documents" disabled={false}>
            <TutorFiles userInfo={userSettings} details={userNew}/>
        </Tab>
        </Tabs>
      </Col>
    
  </div>
</div>
      )
        
    )
}

export default Tutor
