import React, {useState, useEffect}from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { AiFillExperiment } from 'react-icons/ai';

import { compareAsc, format} from 'date-fns';
import fr from 'date-fns/locale/fa-IR'

import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';


const Admin = ({userToken}) =>  {
     

    const [data, setData] = useState({})
    const [userAdmin, setUserAdmin] = useState("")
    const [isLoading, setIsLoading]=useState(true)
    useEffect(() => {
        const fetchData= async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/dashboard/beneficiaries",
                {
                  headers: {
                    Authorization: "Bearer " + userToken,
                    "Content-Type": "multipart/form-data",
                  },
                }
                 )
                 setData(response.data.data)
              setIsLoading(false)
                 console.log(response.data.data.dashboard.beneficiaries)
                setUserAdmin(response.data.data.admin.username.name)
            
            }
            catch (err) {
                console.log(err)
            }
        };
       console.log(data)
        fetchData()
    }, [userToken, userAdmin])
    const formatDate = (date) => {
        const formattedDate = format(new Date(date), "dd/MM/yyyy", {
            locale: fr,
        });
        return formattedDate;
    };



//console.log(admin_settings)
    return isLoading ? (<Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>)
        :(<div>
           
            <span>Bienvenue {userAdmin} sur la page gestionnaire</span>
            <br/>
            <h2>Liste des tuteurs</h2>
            <div style={{display:'flex', flexDirection:'column', position: 'top'}}>
            {/* {{data.dashboard.tutors.map((item)=> {
               return (<>
               
              <span>{item.tutor.name} {item.tutor.lastname}</span> 
              
               </>)
            })} */}</div><br/>
          <h2 style={{fontWeight:'bold'}}>Liste des bénéficiaires</h2>
            <div style={{display:'flex', flexDirection:'column'}}>
            <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
               <Table striped hover size="sm">
                   <thead>
                       <tr>
                           <th>Id</th>
                           <th>Prénom</th>
                           <th>Nom</th>
                           <th>Email</th>
                           <th>Date</th>
                       </tr>
                   </thead>
                   {data.dashboard.beneficiaries.map((item)=> {
               return (<>
                   <tbody>
                       <tr>
                           <td>{item._id}</td>
                           <td>{item.name}</td>
                           <td>{item.lastname}</td>
                           <td>{item.email}</td>
                           <td>{formatDate(item.date)}</td>

                       </tr>
                   </tbody>
                   </>)
            })}
               </Table>
               
              
               {/* <span>{item.grade}</span>
               <div style={{display:'flex', flexDirection:'column'}}>{item.topics.map((el)=> {
                   return <span>{el}</span>
               })}</div><hr/> */}
              
           </div><br/>
        
           
            
        </div>
    )
}

export default Admin
