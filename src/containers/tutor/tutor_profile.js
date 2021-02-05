import React, {useState, useEffect,useMemo, Fragment} from 'react';
import axios from 'axios';
import InputRange from 'react-input-range';
import {useTutor} from "../../store/TutorContextProvider";

// Bootstrap
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RangeSlider from 'react-bootstrap-range-slider';
import Card from 'react-bootstrap/Card';

import './tutor.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { setNestedObjectValues } from 'formik';
import { CardColumns } from 'react-bootstrap';


const TutorProfile = ({...props}) => {
    const tabGrades = ['--', 'Primaire', '6ème', '5ème', '4ème', '3ème', 'Seconde', 'Première', 'Terminale'];
    const tabTopics =  ['Français', 'Mathématiques','Anglais', 'Espagnol' , 'Histoire' , 'Géographie' , 'Physique' , 'Chimie' , 'SVT' , 'Economie', 'Gestion' , 'Marketing' , 'Comptabilité ', 'Numérique' , 'Toutes matières littéraires' , 'Toutes matières scientifiques ', 'Toutes matières' , 'Autres'];
    const tabPedagogicalSkills = ['Je suis dans la bienveillance', 'J’aime transmettre des savoirs', 'J’écoute activement', 'Je sais bien expliquer un cours' , 'Je suis patient(e)', 'Je maitrise ma communication verbale', 'Je suis attentif(ve) à la communication non verbale' ,'Je suis très à l’aise dans les matières pour lesquelles je propose du tutorat' ,'Je cherche toujours des solutions pour me faire comprendre' ,'Je cherche à comprendre le profil de l’apprenant' ,'Je connais un ensemble de ressources pédagogiques utiles' ,'Je cherche à faire progresser l’apprenant' ,'Je suis clair(e)', 'Je préfère expliquer par l’exemple avant de généraliser', 'Je préfère expliquer un concept puis en donner des exemples', 'Je suis capable d’empathie car j’ai rencontré moi-même des difficultés d’apprentissage' ,'J’ai beaucoup lu sur le sujet de l’éducation', 'Je place l’apprenant au cœur du processus d’apprentissage'
    ];
    const tabPedagogicalExperience = ['Je suis enseignant', 'J’ai une expérience dans la formation', 'Je suis dans le milieu de l’éducation', 'J’ai une expérience d’aide aux devoirs et/ou de soutien scolaire', 'Je donne ou j’ai donné des cours privés', 'En tant que parent, j’aide ou j’ai aidé mes enfants dans leurs parcours scolaires', 'J’ai animé des centres de loisirs ou des colonies'];

    const initialValues = [{subject1:"", gradeFrom1:"", gradeTo1:""},{subject2:"", gradeFrom2:"", gradeTo2:""},{subject3:"", gradeFrom3:"", gradeTo3:""}, {subject4:"", gradeFrom4:"", gradeTo4:""} ]

    //const [parameters, setParameters] = useState({})
    const [validated,setValidated]=useState(false);
    const [dataTutor, setDataTutor] = useState({});
    const [userNew, setUserNew]=useState({});
    const [isLoading, setIsLoading]=useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [email2, setEmail2] = useState("");
    const [phone, setPhone] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [skill1, setSkill1] = useState('');
    const [skill2, setSkill2] = useState('');
    const [experience, setExperience] = useState('');
    const [more, setMore] = useState('');
    const [ms_skill, setmsskill] = useState(0);
    const [web_skill, setwebskill] = useState(0);
    const [mail_skill, setmailskill] = useState(0);
    const [remote_skill, setremoteskill] = useState(0);
    const [subject1, setSubject1] = useState('');
    const [gradeFrom1, setGradeFrom1] = useState('');
    const [gradeTo1, setGradeTo1] = useState('');
    const [grades1, setGrades1] = useState([]);
    const [subject2, setSubject2] = useState('');
    const [gradeFrom2, setGradeFrom2] = useState('');
    const [gradeTo2, setGradeTo2] = useState('');
    const [grades2, setGrades2] = useState([]);
    const [subject3, setSubject3] = useState('');
    const [gradeFrom3, setGradeFrom3] = useState('');
    const [gradeTo3, setGradeTo3] = useState('');
    const [grades3, setGrades3] = useState([]);
    const [subject4, setSubject4] = useState('');
    const [gradeFrom4, setGradeFrom4] = useState('');
    const [gradeTo4, setGradeTo4] = useState('');
    const [grades4, setGrades4] = useState([]);
    const [topics, setTopics] = useState([{subject:'', gradeFrom:'', gradeTo:''}])
    const [selectOption, setSelectOption]=useState('')
    const [picture, setPicture]=useState()
    //const userSettingsUpdate = JSON.parse(localStorage.getItem('updatedcurrentUser'))
    
   const tableOptions = ['A distance uniquement', 'En présentiel', 'Peu importe', 'Si possible les deux']
const {state, dispatch} = useTutor();
//const {picture} = state.form;
/* const onChange = (e) => {
  const {name, value} = e.target;
  return dispatch({
    type: "UPDATE_FIELD_PROFILE",
    payload : {key : name, value : value}
  });
}; */

console.log("haha", props.userInfo)

let userSettingsUpdate  = JSON.parse(localStorage.getItem('updatedcurrentUser'))

if (userSettingsUpdate === null) {
userSettingsUpdate = {phone:"", zipcode:"", email2:"", daysPossible:[], topics:[{}], pedagogical_skills:{skill1:'', skill2:'', experience:''}, digital_skills:{}, document:{}, picture :{}, availability:{}, teaching_option:"", course_type:""};

};

console.log("userInfo",props.userInfo)

//const userData = props.dataUser.dataUser

 console.log('userDetails', props.userDetails)



//const tokenFromUser = JSON.parse(localStorage.getItem('currentUserToken'));
//localStorage.setItem('updatedcurrentUser', JSON.stringify(userId));
//const updatedUser = JSON.parse(localStorage.getItem('updatedcurrentUser'));
//const initialUser = JSON.parse(localStorage.getItem('currentUser'));
//console.log(tokenFromUser)
//console.log("1",updatedUser)
//console.log("2",initialUser)
/* console.log(updatedUser.tutor._id) */

//let basicValues = {}
//let detailedValues = {}
//setDataTutor(initialUser)


//console.log('children "', userInfo)
//console.log("values for Form", userInfo.userInfo.name)
//console.log('userId', userInfo.userInfo.id)
//console.log('userDetails ???', userInfo.userDetails)
//console.log('datatutor', dataTutor)
useEffect(() => {
  const fetchUser = async ()=> {
  if (userSettingsUpdate.tutor) {
   try {
     const response = await axios.get(`https://skolaboard-app.herokuapp.com/api/tutor/`+ props.userInfo.id)
     console.log(response.data)
         
   if (response.data.tutor) {
    setIsUpdated(true)
    /* setUserNew(response.data) */
    setDataTutor(response.data)
     userSettingsUpdate = localStorage.setItem('updatedcurrentUser', JSON.stringify(response.data));
     console.log('my answer ', response.data)
     setSelectOption(response.data.teaching_option)
   }
   }
   catch (error) {
     console.log(error.message)
   }
  } 
  else  {
    /* setUserNew(userInfo.userInfo) */
  setDataTutor(props.userInfo) 

  }
   /* console.log('userNew',userNew) */
   console.log('userNew',dataTutor)
   
   //console.log("updated ?", isUpdated)
  }
  console.log(isUpdated)
  setIsLoading(false)
fetchUser()
}, [isUpdated, phone, email2,zipcode, skill1, skill2, experience,more, ms_skill, mail_skill, web_skill, remote_skill, topics, picture]) 

/* useEffect(()=> {
  if (JSON.parse(localStorage.getItem('updatecurrentUser')) === null) {
    setParameters({email2:"", phone : "", zipcode : "", pedagogical_skills:{skill1:"", skill2:"", experience:"", more:""}})
    }
    else {
     setParameters(JSON.parse(localStorage.getItem('updatecurrentUser')))
    }
}, [userInfo.userInfo]) */
const parameters = JSON.parse(localStorage.getItem('updatedcurrentUser'))

  //console.log('parameters',parameters)



//console.log('222',userInfo.userInfo,'RRR',dataTutor)

console.log(email2, zipcode,phone)

    const handleSubmitCoord = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
        console.log("is tutor setting ?", isUpdated, props.userInfo.token)
        if (!parameters) {
        try {

          const response = await axios.post('https://skolaboard-app.herokuapp.com/api/tutor/settings', {email2:email2, phone:phone, zipcode:zipcode, /* pedagogical_skills:{skill1:"", skill2:"", experience:"", more:""} */},
          {
            headers: {
              Authorization: "Bearer " + props.userInfo.token,
            "Content-Type": "application/json", 
              
            },
            
          })
         setDataTutor(response.data) 
         console.log(response.data)
        }
        catch(error) {
          console.log(error.message)
        }
      }
        else  {
          try {
          const response = await axios.put('https://skolaboard-app.herokuapp.com/api/tutor/settings/update/'+ props.userInfo.id, {email2:email2, phone:phone, zipcode:zipcode},
        {
          headers: {
            Authorization: "Bearer " + props.userInfo.token,
          "Content-Type": "application/json", 
            
          },
          
        })
       setDataTutor(response.data) 
       console.log(response.data)

        }
//console.log(dataTutor)
      
      

       catch (error) {
         console.log(error.message)
      }
}
    };

    const handleSubmitPedag = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
     //console.log("is tutor setting ?",userInfo, isUpdated, userInfo.userInfo.token)
      try {
        if (isUpdated===false) {
          const response = await axios.post('https://skolaboard-app.herokuapp.com/api/tutor/settings', {email2:email2, phone:phone, zipcode:zipcode, /* pedagogical_skills:{skill1:"", skill2:"", experience:"", more:""} */},
          {
            headers: {
              Authorization: "Bearer " + props.userInfo.token,
            "Content-Type": "application/json", 
              
            },
            
          })
         setDataTutor(response.data) 
         //console.log(response.data)
        }
        else if (isUpdated===true) {
          const response = await axios.put('https://skolaboard-app.herokuapp.com/api/tutor/settings/update/'+ props.userInfo.id, {pedagogical_skills:{skill1:skill1, skill2:skill2, experience:experience,more: more}},
        {
          headers: {
            Authorization: "Bearer " + props.userInfo.token,
          "Content-Type": "application/json", 
            
          },
          
        })
       setDataTutor(response.data) 
       console.log(response.data)

        }
//console.log(dataTutor)
      
      }
       
       catch (error) {
         console.log('going through catch')
         console.log(error.message)
       }

    };
    const handleSubmitDigit = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
     //console.log("is tutor setting ?",userInfo, isUpdated, userInfo.userInfo.token)
      try {
        if (isUpdated===false) {
          const response = await axios.post('https://skolaboard-app.herokuapp.com/api/tutor/settings', {email2:email2, phone:phone, zipcode:zipcode, /* pedagogical_skills:{skill1:"", skill2:"", experience:"", more:""} */},
          {
            headers: {
              Authorization: "Bearer " + props.userInfo.token,
            "Content-Type": "application/json", 
              
            },
            
          })
         setDataTutor(response.data) 
         //console.log(response.data)
        }
        else if (isUpdated===true) {
          const response = await axios.put('https://skolaboard-app.herokuapp.com/api/tutor/settings/update/'+ props.userInfo.id, {digital_skills:{ms_skill:ms_skill, mail_skill:mail_skill, web_skill:web_skill, remote_skill: remote_skill}},
        {
          headers: {
            Authorization: "Bearer " + props.userInfo.token,
          "Content-Type": "application/json", 
            
          },
          
        })
       setDataTutor(response.data) 
       //console.log(response.data)

        }
console.log(dataTutor)
      
      }
       
       catch (error) {
         console.log('going through catch')
         console.log(error.message)
       }

    };

//formData.append('gradeFrom', gradeFrom)
//formData.append('gradeTo', gradeTo)
//formData.append('topics', JSON.stringify('subject' ,subject))

    /* const topics = new FormData();
    for (let i = 0; i < 4; i++) {
      
      topics[i].append('subject', subject);
      topics[i].append('gradeFrom', gradeFrom);
      topics[i].append('gradeTo', gradeTo);
    } */
    //console.log('formdata ? ',subject)
    //const formData = new FormData();
    //formData.set('topics', [{subject: subject, gradeFrom:'6ème', gradeTo:'3ème'}])
//const newtopics=[{subject: subject, gradeFrom:'6ème', gradeTo:'3ème'}]
//topics.push({subject:subject, gradeFrom:'4ème', gradeTo:'Seconde'})

/* const formData = new FormData();
formData.append('subject', subject);
formData.apppend('gradeFrom', gradeFrom);
formData.append('gradeTo', gradeTo);

let subj = formData.getAll('subject');
let from = formData.getAll('gradeFrom');
let to = formData.getAll('gradeTo');

console.log(formData)

const newTopics = subj.map((subject, i)=> (
{subject: subj[i], gradeFrom:from[i], gradeTo: to[i]}
))
console.log('hhhhhhhha',{newTopics}) */


let values = []
const handleInputChangeTopic= (event)=> {
  event.preventDefault();

  if (event.target.id === 'subject1') {
    setSubject1(event.target.value);
  }
  else if (event.target.id === 'gradeFrom1' ) {
    setGradeFrom1(event.target.value);
  }
  else if (event.target.id === 'gradeTo1') {
    setGradeTo1(event.target.value);
  }
  else if (event.target.id === 'subject2') { 
    setSubject2(event.target.value);
  }
 else if (event.target.id === 'gradeFrom2') {
    setGradeFrom2(event.target.value);
  }
 else if (event.target.id === 'gradeTo2') {
    setGradeTo2(event.target.value);
  }
  else if (event.target.id === 'subject3') {
    setSubject3(event.target.value);
  }
  else if (event.target.id === 'gradeFrom3' ) {
    setGradeFrom3(event.target.value);
  }
  else if (event.target.id === 'gradeTo3') {
    setGradeTo3(event.target.value);
  }
  else if (event.target.id === 'subject4') { 
    setSubject4(event.target.value);
  }
 else if (event.target.id === 'gradeFrom4') {
    setGradeFrom4(event.target.value);
  }
 else if (event.target.id === 'gradeTo4') {
    setGradeTo4(event.target.value);
  }

 

 

}
useEffect(()=> {
  const setTopicsfunc = () => {
    let values =[];
    values.push({subject:subject1, gradeFrom: gradeFrom1, gradeTo : gradeTo1}, {subject : subject2, gradeFrom: gradeFrom2, gradeTo: gradeTo2}, {subject:subject3, gradeFrom: gradeFrom3, gradeTo : gradeTo3}, {subject : subject4, gradeFrom: gradeFrom4, gradeTo: gradeTo4});
    console.log("values for topics", values)
    setTopics(values);

  }
  setTopicsfunc()
}, [subject1, gradeFrom1, gradeTo1, subject2, gradeFrom2, gradeTo2, subject3, gradeFrom3, gradeTo3, subject4, gradeFrom4, gradeTo4])


    const handleSubmitTopics = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
     console.log("is tutor setting ?", isUpdated, props.userInfo.token)
     console.log("topics",topics)
      
     try {
        if (isUpdated===false) {
          alert("false")
          const response = await axios.post('https://skolaboard-app.herokuapp.com/api/tutor/settings', {email2:email2, phone:phone, zipcode:zipcode, /* pedagogical_skills:{skill1:"", skill2:"", experience:"", more:""} */},
          {
            headers: {
              Authorization: "Bearer " + props.userInfo.token,
            "Content-Type": "application/json", 
              
            },
            
          })
         setDataTutor(response.data) 
         console.log(response.data)
        }
        else if (isUpdated===true) {
          alert("hello")
          const response = await axios.put('https://skolaboard-app.herokuapp.com/api/tutor/settings/update/'+ props.userInfo.id,  {topics:topics},
        {
          headers: {
            Authorization: "Bearer " + props.userInfo.token,
          "Content-Type": "application/json", 
            
          },
          
        })
       setDataTutor(response.data) 
       console.log('i am here',subject1, subject2)
       console.log('i am here',event.target.id)

        }
console.log(dataTutor)
      
      }
       
       catch (error) {
         console.log('going through catch')
         console.log(error.message)
       }

    };

/*  const handleOptionDistanceChange = (changeEvent) => {
      changeEvent.persist();

        setSelectOption(prevState => ({...prevState, selectOption : changeEvent.target.value}))
    }  */


    const handleSubmitOption = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
     // localStorage.setItem('checkbox', event.target.checked.toString())
      try {
        const response = await axios.put('https://skolaboard-app.herokuapp.com/api/tutor/settings/update/'+ props.userInfo.id, {teaching_option : selectOption},
        {
          headers: {
            Authorization: "Bearer " + props.userInfo.token,
          "Content-Type": "application/json", 
          },
          
        })
       setDataTutor(response.data) 
       //console.log(response.data)
      
      }
       
       catch (error) {
         console.log('going through catch')
         console.log(error.message)
       }

    }; 
    
    // console.log(parameters.teaching_option)
    const formData = new FormData();
    formData.append('picture', picture)

    console.log(formData.get('picture'))

    const uploadPicture = async (event) => {
      event.preventDefault();

      try {
              const response = await axios.put('https://skolaboard-app.herokuapp.com/api/tutor/settings/update/' + props.userInfo.id, formData,
              {
                headers : {
                  Authorization : "Bearer " + props.userInfo.token,
                  "Content-type" : "multipart/form-data"
                }
              });
              console.log(response.data.data.picture)
              if (response.data) {
                localStorage.setItem('updatedPicture', JSON.stringify(response.data.data.picture.secure_url));
                setPicture(response.data.data.picture)
                }
      }
      catch (error) {
          console.log(error.message)
              }
     }
//   console.log(picture)


    return (
      isLoading ? (<span>Waiting for download...</span>):(
<div style = {{margin:'auto', paddingTop:'15px'/* , display:'flex', justifyContent:'flex-end' */}}>
    <Container fluid >
      <Row xs={1} sm={1} md={1} lg={1} xl={1}>
        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
          <Card className='card_style'>
            <Form  validated={validated} onSubmit={handleSubmitCoord}>
              <Form.Row className='card_header'>
                <Form.Group as = {Col}>
                  <span className='title_profile_short'>Mes coordonnées</span>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Control size='sm' type="text"   readOnly value={props.userInfo.name} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastname">
                  <Form.Control size='sm' type="text" readOnly value={props.userInfo.lastname}/>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail01">
                  <Form.Control size='sm' type="email" readOnly value={props.userInfo.email}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail02">
                  {parameters === null ? (
                    <Form.Control size='sm' type="email" placeholder="Email 2" name="email2" 
                    onChange={({target})=> setEmail2(target.value)} />
                  ) : (
                      <Form.Control size='sm' type="email" placeholder="Email 2" name="email2" 
                            value={ parameters.email2 || email2 || ''}  onChange={({target})=> setEmail2(target.value)} />
                            )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPhone">
                  {parameters === null ? (
                    <Form.Control size='sm' type="phone" placeholder="Téléphone" name="phone"  
                onChange={(event)=> setPhone(event.target.value)}/>
                  ):(
                    <Form.Control size='sm' type="phone" placeholder="Téléphone" name="phone"  
                          value = {parameters.phone || phone || ''} onChange={(event)=> setPhone(event.target.value)}/>
                          )}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  {parameters === null? (
                    <Form.Control size='sm' placeholder='Code postal' name="zipcode" 
                
                  onChange={({target})=> setZipcode(target.value)}/>
                  ):(
                    <Form.Control size='sm' placeholder='Code postal' name="zipcode" 
                  value = {parameters.zipcode || zipcode || ''}
                  onChange={({target})=> setZipcode(target.value)}/>
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row className='card_footer'>
              <span>
                <Form.Group as={Col} >
                  <Button size='sm' style ={{borderRadius:'5px'
              }}  type="submit">
                Sauvegarder
                  </Button>
                </Form.Group>
                </span>
              </Form.Row>
            </Form>
          </Card> 

            {/* Je souhaite faire du tutorat dans ces matières */}

          <Card className='card_style'>
            <Form validated = {validated} onSubmit = {handleSubmitTopics}>   
              <Form.Row className='card_header'> 
                <Form.Group as = {Col}>
                  <span className='title_profile_long' style={{overflowx:"hidden"}}>Les matières dans lesquelles je souhaite faire du tutorat</span>
                  
                </Form.Group>
      
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} sm={6} >
                    <Form.Label style={{fontSize:'10px'}}>MATIÈRES</Form.Label>
                        {userSettingsUpdate.topic === {} ? (
                      <Form.Control size='sm' as='select'  custom id='subject1' 
                          onChange={event => handleInputChangeTopic(event)}>
                          <option selected >Matière</option>
                          {tabTopics.map((topic)=> (
                              <option value={topic}>{topic}</option>
                              ))}
                      </Form.Control>
                        ):(
                      <Form.Control size='sm' as='select'  
                          custom 
                          id='subject1'
                          value = { userSettingsUpdate.topics[0].subject  || subject1 ||  ''}
                          onChange={(event)=>  handleInputChangeTopic(event)}>
                            <option selected >Matière</option>
                          {tabTopics.map((topic)=> (
                              <option value={topic}>{topic}</option>
                              ))}
                      </Form.Control>
                        )}
                    
                    </Form.Group>
                    <Form.Group as={Col} sm={3}>
                      <Form.Label style={{fontSize:'10px'}} size='md'>NIVEAUX : DE</Form.Label>
                    {userSettingsUpdate.topic === {}  ? (
                      <Form.Control size='sm' as='select'custom id='gradeFrom1'
                        onChange={event => handleInputChangeTopic(event)}>
                        {tabGrades.map((option)=> (  
                            <option value = {option}>{option}</option>
                            ))}
                      </Form.Control>
                    ):(
                      <Form.Control size='sm' as='select'custom id='gradeFrom1'
                        value = {userSettingsUpdate.topics[0].gradeFrom || gradeFrom1 ||  ''}
                        onChange={event => handleInputChangeTopic(event)}>
                        {tabGrades.map((option)=> (  
                            <option value = {option}>{option}</option>
                            ))}
                      </Form.Control>
                    )}
                    
                    </Form.Group>
                    <Form.Group as={Col} sm={3}>
                      <Form.Label style={{fontSize:'10px'}}>À</Form.Label>
                      {userSettingsUpdate.topic === {}   ? (
                      <Form.Control size='sm' as='select' custom id='gradeTo1'
                        onChange={event => handleInputChangeTopic(event)}>
                        {tabGrades.map((option)=> (  
                            <option value = {option}>{option}</option>
                            ))}
                      </Form.Control>
                    ):(
                      <Form.Control size='sm' as='select' custom id='gradeTo1'
                        value= {gradeTo1 || userSettingsUpdate.topics[0].gradeTo || ''}
                        onChange={event => handleInputChangeTopic(event)}>
                        {tabGrades.map((option)=> (  
                            <option value = {option}>{option}</option>
                            ))}
                      </Form.Control>
                    )}
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} sm={6}>
                      {!userSettingsUpdate.topic ? (
                <Form.Control size='sm' as='select' custom id='subject2'
                onChange={event => handleInputChangeTopic(event)}>
                  <option selected >Matière</option>
                {tabTopics.map((topic)=> (
                        <option value={topic}>{topic}</option>
                        ))}
                </Form.Control>
                                ): (
              <Form.Control size='sm' as='select' custom id='subject2'
              value = {subject2 || userSettingsUpdate.topics[1].subject || ''}
              onChange={event => handleInputChangeTopic(event)}>
                <option selected >Matière</option>
                {tabTopics.map((topic)=> (
                        <option value={topic}>{topic}</option>
                        ))}
                </Form.Control>
                                )}
                  
                    </Form.Group>
                    <Form.Group as={Col} sm={3}>
                      {!userSettingsUpdate.topic ? (
              <Form.Control size='sm' as='select'  custom  
              id='gradeFrom2'
              onChange={event => handleInputChangeTopic(event)}>
                {tabGrades.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Form.Control>
                      ):(
                        <Form.Control size='sm' as='select'  custom  
                        id='gradeFrom2'
                        value = {gradeFrom2 || parameters.topics[1].gradeFrom || ''}
                        onChange={event => handleInputChangeTopic(event)}>
                          {tabGrades.map((option) => (
                            <option value={option}>{option}</option>
                          ))}
                        </Form.Control>
                      )}

                    </Form.Group>
                    <Form.Group as={Col} sm={3}>
                      {!userSettingsUpdate.topic ? (
                        <Form.Control as='select' size='sm' custom 
                    id = 'gradeTo2'
                    onChange={event => handleInputChangeTopic(event)}>
                    {tabGrades.map((option) => (
                  <option value={option}>{option}</option>
                ))}
                    </Form.Control>
                      ):(
                <Form.Control as='select' size='sm' custom 
                    id = 'gradeTo2' 
                    value = {gradeTo2 || parameters.topics[1].gradeTo || ''}
                    onChange={event => handleInputChangeTopic(event)}>
                    {tabGrades.map((option) => (
                  <option value={option}>{option}</option>
                ))}
                    </Form.Control>
                      )}
                    
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} sm={6} >
                        {!userSettingsUpdate.topic ? (
                          <Form.Control size='sm' as='select'  custom id='subject3' 
                          onChange={event => handleInputChangeTopic(event)}>
                          <option selected >Matière</option>
                          {tabTopics.map((topic)=> (
                              <option value={topic}>{topic}</option>
                              ))}
                          </Form.Control>
                        ):(
                          <Form.Control size='sm' as='select'  
                          custom 
                          id='subject3'
                          value = {subject3 || parameters.topics[2].subject || ''}
                          onChange={(event)=>  handleInputChangeTopic(event)}>
                            <option selected >Matière</option>
                          {tabTopics.map((topic)=> (
                              <option value={topic}>{topic}</option>
                              ))}
                          </Form.Control>
                        )}
                    
                    </Form.Group>
                    <Form.Group as={Col} sm={3}>
                    {!userSettingsUpdate.topic ? (
                      <Form.Control size='sm' as='select'custom id='gradeFrom3'
                    onChange={event => handleInputChangeTopic(event)}>
                    {tabGrades.map((option)=> (  
                        <option value = {option}>{option}</option>
                        ))}
                    </Form.Control>
                    ):(
                      <Form.Control size='sm' as='select'custom id='gradeFrom3'
                    value = {gradeFrom3 || parameters.topics[2].gradeFrom || ''}
                    onChange={event => handleInputChangeTopic(event)}>
                    {tabGrades.map((option)=> (  
                        <option value = {option}>{option}</option>
                        ))}
                    </Form.Control>

                    )}
                    
                    </Form.Group>
                    <Form.Group as={Col} sm={3}>
                    {!userSettingsUpdate.topic ? (
                      <Form.Control size='sm' as='select' custom id='gradeTo3'
                    onChange={event => handleInputChangeTopic(event)}>
                    {tabGrades.map((option)=> (  
                        <option value = {option}>{option}</option>
                        ))}
                    </Form.Control>
                    ):(
                <Form.Control size='sm' as='select' custom id='gradeTo3'
                    value= {gradeTo3 || parameters.topics[2].gradeTo || ''}
                    onChange={event => handleInputChangeTopic(event)}>
                    {tabGrades.map((option)=> (  
                        <option value = {option}>{option}</option>
                        ))}
                    </Form.Control>
                    )}   
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} sm={6}>
                      {!userSettingsUpdate.topic ? (
                <Form.Control size='sm' as='select' custom id='subject4'
                onChange={event => handleInputChangeTopic(event)}>
                  <option selected >Matière</option>
                {tabTopics.map((topic)=> (
                        <option value={topic}>{topic}</option>
                        ))}
                </Form.Control>
                                ): (
              <Form.Control size='sm' as='select' custom id='subject4'
              value = {subject4 || parameters.topics[3].subject || ''}
              onChange={event => handleInputChangeTopic(event)}>
                <option selected >Matière</option>
                {tabTopics.map((topic)=> (
                        <option value={topic}>{topic}</option>
                        ))}
                </Form.Control>
                                )}       
                    </Form.Group>
                    <Form.Group as={Col} sm={3}>
                      {!userSettingsUpdate.topic ? (
              <Form.Control size='sm' as='select'  custom  
              id='gradeFrom4'
              onChange={event => handleInputChangeTopic(event)}>
                {tabGrades.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Form.Control>
                      ):(
                        <Form.Control size='sm' as='select'  custom  
                        id='gradeFrom4'
                        value = {gradeFrom4 || parameters.topics[3].gradeFrom || ''}
                        onChange={event => handleInputChangeTopic(event)}>
                          {tabGrades.map((option) => (
                            <option value={option}>{option}</option>
                          ))}
                        </Form.Control>
                      )}

                    </Form.Group>
                    <Form.Group as={Col} sm={3}>
                      {!userSettingsUpdate.topic ? (
                        <Form.Control as='select' size='sm' custom 
                    id = 'gradeTo4'
                    onChange={event => handleInputChangeTopic(event)}>
                    {tabGrades.map((option) => (
                  <option value={option}>{option}</option>
                ))}
                    </Form.Control>
                      ):(
                <Form.Control as='select' size='sm' custom 
                    id = 'gradeTo4' 
                    value = {gradeTo4 || parameters.topics[3].gradeTo || ''}
                    onChange={event => handleInputChangeTopic(event)}>
                    {tabGrades.map((option) => (
                  <option value={option}>{option}</option>
                ))}
                    </Form.Control>
                      )}
                    
                    </Form.Group>
                </Form.Row>
                <Form.Row className='card_footer'>
                <span>
                  <Form.Group as={Col} >
                  <Button size='sm' style ={{borderRadius:'5px'
              }}  type="submit">
                  Sauvegarder
                </Button>
                  </Form.Group>
                  </span>
                  </Form.Row>
                      </Form>    
                      </Card> 
                  </Col>
        <Col xs={12} sm={6} md={6} lg={6} xl={3}>
        <Card className='card_style'>
        <Form  validated={validated} onSubmit={handleSubmitPedag}>
                
                <Form.Row className='card_header'> 
          <Form.Group as={Col} sm={11}>
            <span className='title_profile_short' >Mes compétences pédagogiques</span>
            </Form.Group>
        
        </Form.Row>
                    <Form.Row >
                        <Form.Group as = {Col} controlId='select01'>
                          {userSettingsUpdate.pedagogical_skills.skill1 = "" ? (
                            <Form.Control as='select' size='sm' placeholder="Compétence pédagogique" custom className='input_pedagogical_text' 
                      onChange={(event)=> setSkill1(event.target.value)}>
                        <option  selected  >Compétence pédagogique n°1</option> 
                            {tabPedagogicalSkills.map((skill1)=> {
        
                                return <option value={skill1}>{skill1}</option>
                            })}
                        </Form.Control>
                          ):(
    <Form.Control as='select' size='sm' placeholder="Compétence pédagogique" custom className='input_pedagogical_text' 
                        value= {userSettingsUpdate.pedagogical_skills.skill1 || skill1 || "" }
                        onChange={(event)=> setSkill1(event.target.value)}>
                        <option  selected  >Compétence pédagogique n°1</option> 
                            {tabPedagogicalSkills.map((skill)=> {
                                return <option value={skill}>{skill}</option>
                            })}
                        </Form.Control>
                          )}
                        
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as = {Col} controlId='select02'  >
                      {userSettingsUpdate.pedagogical_skills ==={} ? (
                        <Form.Control  as='select' size='sm' placeholder="Compétence pédagogique" custom className='input_pedagogical_text' 
                    
                    onChange={(event)=> setSkill2(event.target.value)}>
                    <option selected >Compétence pédagogique n°2</option>
                    {tabPedagogicalSkills.map((skill)=> {
                                return <option value={skill}>{skill}</option>
                            })}
                        </Form.Control>
                      ):(
    <Form.Control  as='select' size='sm' placeholder="Compétence pédagogique" custom className='input_pedagogical_text' 
                    value={skill2 || userSettingsUpdate.pedagogical_skills.skill2 || ''}
                    onChange={(event)=> setSkill2(event.target.value)}>
                    <option selected >Compétence pédagogique n°2</option>
                            
                            {
                              tabPedagogicalSkills.map((skill)=> {
                                return <option value={skill}>{skill}</option>
                            })}
                        </Form.Control>
                      )}
                    
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as = {Col} controlId='select03'>
                      {userSettingsUpdate.pedagogical_skills.experience === "" ? (
                        <Form.Control as='select' size='sm' placeholder="Compétence pédagogique" custom className='input_pedagogical_text' 
                  
                    onChange={(event)=> setExperience(event.target.value)}>
                    <option  selected >Expérience pédagogique</option>
                            {tabPedagogicalExperience.map((exp)=> {
                                return <option value={exp}>{exp}</option>
                            })}
                        </Form.Control>
                      ):(
    <Form.Control as='select' size='sm' placeholder="Compétence pédagogique" custom className='input_pedagogical_text' 
                    value = {experience || userSettingsUpdate.pedagogical_skills.experience ||'' }
                    onChange={(event)=> setExperience(event.target.value)}>
                    <option  selected >Expérience pédagogique</option>
                            {tabPedagogicalExperience.map((exp)=> {
                                return <option value={exp}>{exp}</option>
                            })}
                        </Form.Control>
                      )}
                    
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as = {Col} controlId='select04'>
                      {userSettingsUpdate.pedagogical_skills.more === "" ? (
                        <Form.Control style={{fontSize:'12px'}} as="textarea" rows={8} placeholder='J’adore expliquer ceci et cela depuis ma plus tendre enfance. Je m’occupe tous les jours de ma petite soeur. Je fais du tutorat. Je ne fais jamais de fautes d’orthographe. Et quand j’en fais, c’est à dessein : pour le plaisir de transgresser !'
                        name='memo'
                      
                        onChange={(event)=> setMore(event.target.value)}/>
                      ):(
    <Form.Control style={{fontSize:'12px'}} as="textarea" rows={8} placeholder='J’adore expliquer ceci et cela depuis ma plus tendre enfance. Je m’occupe tous les jours de ma petite soeur. Je fais du tutorat. Je ne fais jamais de fautes d’orthographe. Et quand j’en fais, c’est à dessein : pour le plaisir de transgresser !'
                        name='memo'
                        value = {more || userSettingsUpdate.pedagogical_skills.more || ''}
                        onChange={(event)=> setMore(event.target.value)}/>
                      )}
                        
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className='card_footer'>
      <span>
        <Form.Group as={Col} >
        <Button size='sm' style ={{borderRadius:'5px'
    }}  type="submit">
        Sauvegarder
      </Button>
        </Form.Group>
        </span>
        </Form.Row>
                </Form> 
            
            </Card>
        <Card className='card_style' /* style={{height:'185px'}} */>
            <Form onSubmit={uploadPicture}>
        <Form.Row className='card_header'> 
          <Form.Group as={Col} sm={11}>
            <span className='title_profile_short'>Je modifie ma photo</span>
            </Form.Group>
            
      
        </Form.Row>
                            <Form.File.Input
                            style={{fontSize:'0.8rem'}}
                            id="custom-file-translate-html"
                            name='picture'
                            label = "Photo"
                            size='xs'
                            lang="fr"
                            custom
                            onChange={(event) => setPicture(event.target.files[0])} 
                          /*  onChange={(event) => {
                              const {name, files} = event.target;
                              return dispatch({
                                type: "UPDATE_FIELD_PROFILE",
                                payload: {key: name, value : files[0]}
                              });
                            }} */
                            >
                            </Form.File.Input>
                            <div style={{height:'22px'}}></div>
                          <Form.Row className='card_footer'>
                        <span>
                          <Form.Group as={Col} >
                              
                              <Button size='sm' style ={{borderRadius:'5px'
                          }}  type="submit">
                              Sauvegarder
                            </Button>
                            
                          </Form.Group>
                          </span>
                          </Form.Row>
                          </Form>
                              </Card>
                          </Col>
        
        <Col xs={12} sm={6} md={6} lg={6} xl={3}>
        <Card className='card_style'>
        <Form noValidate={false} validated={validated} onSubmit={handleSubmitDigit}>
                
        <Form.Row className='card_header'> 
          <Form.Group as={Col} sm={11}>
            <span className='title_profile_short'>Mes habitudes numériques</span>
            </Form.Group>

        </Form.Row>
        
                    <Form.Row >
                        <Form.Group as = {Col} controlId='range01'>
                            <Form.Label className='input-text-style'>MAIL</Form.Label>
                            {userSettingsUpdate.digital_skills.mail_skill === ""  ? (
                              <Form.Control size='sm' min={0} max={5} step={1} type='range'  
                        
                        onChange={(event)=> setmailskill(event.target.value)}/>
                            ):(
    <Form.Control size='sm' min={0} max={5} step={1} type='range'  
                        value = {mail_skill || userSettingsUpdate.digital_skills.mail_skill || 0}
                        onChange={(event)=> setmailskill(event.target.value)}/>
                            )}
                        
                        </Form.Group>
                    </Form.Row>
                    <Form.Row >
                    <Form.Group as = {Col} controlId='range02'>
                        <Form.Label className='input-text-style'>MICROSOFT OFFICE OU AUTRES PACKS</Form.Label>
                        {userSettingsUpdate.digital_skills.ms_skill === ""   ? (
                          <Form.Control size='sm' min={0} max={5} step={1} type='range'  
                      
                        onChange={(event)=> setmsskill(event.target.value)}/>
                        ):(
    <Form.Control size='sm' min={0} max={5} step={1} type='range'  tooltip = 'auto' tooltipLabel= {value=> `${value}`}
                      value = {ms_skill || userSettingsUpdate.digital_skills.ms_skill || 0}
                        onChange={(event)=> setmsskill(event.target.value)}/>
                        )}
                        
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as = {Col} controlId='range03'>
                    <Form.Label className='input-text-style'>WEB ET RÉSEAUX SOCIAUX</Form.Label>
                    {userSettingsUpdate.digital_skills.web_skill === ""   ? (
    <Form.Control size='sm' min={0} max={5} step={1} type='range'  

        onChange={(event)=> setwebskill(event.target.value)}/>
                    ):(
                      <Form.Control size='sm' min={0} max={5} step={1} type='range'  
                      value = {web_skill || userSettingsUpdate.digital_skills.web_skill || 0} 
                        onChange={(event)=> setwebskill(event.target.value)}/>
                    )}
                      
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as = {Col} controlId='range04'>
                    <Form.Label className='input-text-style'>OUTILS DE TÉLÉTRAVAIL</Form.Label>
                    {userSettingsUpdate.digital_skills.remote_skill === "" ? (
          <Form.Control size='sm' min={0} max={5} step={1}  type='range' 
          
          onChange={(event)=> setremoteskill(event.target.value)}/>
                    ):(
                      <Form.Control size='sm' min={0} max={5} step={1}  type='range'  
                      value = {remote_skill || userSettingsUpdate.digital_skills.remote_skill || 0} 
                      onChange={(event)=> setremoteskill(event.target.value)}/>
                    )}
                  
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className='card_footer'>
      <span>
        <Form.Group as={Col} >
        <Button size='sm' style ={{borderRadius:'5px'
    }} type="submit">
        Sauvegarder
      </Button>
        </Form.Group>
        </span>
        </Form.Row>
                </Form> 
            
            </Card>
            <Card className='card_style' /* style={{height:'250px'}} */>
        <Form validated={validated} onSubmit={handleSubmitOption} >
        <Form.Row className='card_header'> 
          <Form.Group as={Col} sm={12}>
            <span className='title_profile_short'>Je souhaite faire du tutorat</span>
            </Form.Group>

        </Form.Row>
        
                    <Form.Row style={{lineHeight:'26px', fontSize:'13px'}}>
                      <Form.Check 
                        type='radio'
                        id='input-01'
                        label= 'A distance uniquement'
                        size='sm'
                        value = 'A distance uniquement' 
                        checked = { selectOption === 'A distance uniquement' }
                        onChange={(event) => setSelectOption(event.currentTarget.value)}
                      />
                            
                  
                    </Form.Row>
                  
                      <Form.Row style={{lineHeight:'26px', fontSize:'13px'}}>
                        <Form.Check
                        type='radio'
                        id='input-02'
                        label='En présentiel'
                        size='sm'
                        value = 'En présentiel'
                        checked = {selectOption ==='En présentiel'}
                        onChange={(event) => setSelectOption(event.currentTarget.value)}
                      />

      
                    </Form.Row>
                    <Form.Row style={{lineHeight:'26px', fontSize:'13px'}}>
                        <Form.Check 
                        type='radio'
                        id='input-03'
                        label='Peu importe'
                        size='sm'
                        value = 'Peu importe'
                        checked = {selectOption==='Peu importe'}
                        onChange={(event) => setSelectOption(event.currentTarget.value)}
                      />
                      
                    
                    </Form.Row>
                    <Form.Row style={{lineHeight:'26px', fontSize:'13px'}}>
                      
                          <Form.Check 
                          type='radio'
                          id='input-04'
                          label='Si possible les deux'
                          size='sm'
                          value =  'Si possible les deux'
                          checked = {selectOption === 'Si possible les deux'}
                          onChange={(event) => setSelectOption(event.currentTarget.value)}
                        />
                        
                    
                    </Form.Row>  
                    <div style={{height:'30px'}}></div>
                      
                    <Form.Row className='card_footer'>
      <span>
        <Form.Group as={Col} >
        <Button size='sm' style ={{borderRadius:'5px'
    }}  type="submit">
        Sauvegarder
      </Button>
        </Form.Group>
        </span>
        </Form.Row>
                </Form> 
            
            </Card>
        </Col>
      
      </Row>

    </Container>
</div>
    ))
}

export default TutorProfile
