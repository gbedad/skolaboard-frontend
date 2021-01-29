import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';


// Bootstrap
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

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
    const [isLoading, setIsLoading]=useState(false)
    const [userId, setUserId] = useState()
    const userSettings = JSON.parse(localStorage.getItem('currentUser'));
    const [pictureId, setPictureId]=useState();
    const {state, dispatch} = useTutor();
    const {picture} = state.form;
    
    //const userSettingsUpdate = JSON.parse(localStorage.getItem('updatedcurrentUser'));
console.log(picture)
console.log("state", state)
 console.log('first request',userSettings, userSettings.id)

 useEffect(()=> {

 }, [state])
 //setUserNew(userSettings)
 //console.log('second request',userSettingsUpdate)
/* 
 const user = location.state  */
useEffect(() => {
   const fetchUser = async ()=> {
   
    try {
        
      console.log('localstorage',userSettings)
      console.log('id',userId)
      
      
console.log(userSettings.id)
      if (userSettings.id) {

      const response = await axios.get(`http://192.168.0.31:3000/api/tutor/${userSettings.id}`)
          console.log('Am I satisfied ? ',response.data)
    if (response.data) {
     const details = localStorage.setItem('updatedcurrentUser', JSON.stringify(response.data));
      setUserNew(response.data);
      if (response.data.picture.secure_url) {
        setPictureId(response.data.picture.secure_url)
      }
    }
    setIsLoading(false)
  }
  else {
    setUserNew(userSettings)
  }

    }
    catch (error) {
      console.log(error.message)
    }
 
  
    
   }
fetchUser()
 }, [userSettings, pictureId])
 console.log('after',userNew)

 const store = JSON.parse(localStorage.getItem('updatedcurrentUser'))
console.log('with localstorage ,',store) 
console.log(pictureId) 



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
            <h4>Profil Tuteur</h4>
            <br/>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>

            <Col sm={2}>

            <Container>
  <Row>

    <Col >
      <Col xs={3} md={2}>
        {/* {picture ?(<img src={picture} style={{width:'100px', height:'100px', borderRadius:'50px', objectFit:'cover'}}/>):(<img src={avatar} style={{width:'100px', height:'100px', borderRadius:'50px', objectFit:'cover'}}/>) } */}
        <img src={pictureId} style={{width:'100px', height:'100px', borderRadius:'50px', objectFit:'cover'}}/>
      </Col>
      
      <Row>Mon Dashboard</Row>
      <Row>Mes étudiants</Row>
    </Col>

  </Row>
</Container>

            </Col>
            <Col sm={10}>
                <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      
    >
      <Tab eventKey="profile" title="Je complète mon profil" style={{border:'none'}}>
       <TutorProfile userInfo={userSettings} userId={userSettings.id} token={userSettings.token} details={userNew}/> 
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
