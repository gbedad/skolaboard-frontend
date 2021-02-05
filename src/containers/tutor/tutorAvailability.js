import React, {useState, useEffect, useMemo} from 'react';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";
import DatePicker, {registerLocale, setDefaultLocale, CalendarContainer} from "react-datepicker";
import fr from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css";
import { format, compareAsc } from 'date-fns';

import {useTutor} from "../../store/TutorContextProvider";

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './tutorAvailability.css'

registerLocale('fr', fr)

const TutorAvailability = (userInfo) => {
    const [cells, setCells] = useState([
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]
      ]);
      const [reservedCells, setReservedCells] = useState([
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]
      ]);
    const tableDays = [['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
                        ['Lundi 8h00-8h30', 'Mardi 8h00-8h30', 'Mercredi 8h00-8h30', 'Jeudi 8h00-8h30', 'Vendredi 8h00-8h30', 'Samedi 8h00-8h30', 'Dimanche 8h30-8h30'],
                        ['Lundi 8h30-9h00', 'Mardi 8h30-9h00', 'Mercredi 8h30-9h00', 'Jeudi 8h30-9h00', 'Vendredi 8h30-9h00', 'Samedi 8h30-9h00', 'Dimanche 8h30-9h00'],
                        ['Lundi 9h00-9h30', 'Mardi 9h00-9h30', 'Mercredi 9h00-9h30', 'Jeudi 19h00-9h30', 'Vendredi 9h00-9h30', 'Samedi 9h00-9h30', 'Dimanche 9h00-9h30'],
                        ['Lundi 9h30-10h00', 'Mardi 9h30-10h00', 'Mercredi 9h30-10h00', 'Jeudi 9h30-10h00', 'Vendredi 9h30-10h00', 'Samedi 9h30-10h00', 'Dimanche 9h30-10h00'],
                        ['Lundi 10h00-10h30', 'Mardi 10h00-10h30', 'Mercredi 10h00-10h30', 'Jeudi 10h00-10h30', 'Vendredi 10h00-10h30', 'Samedi 10h00-10h30', 'Dimanche 10h00-10h30'],
                        ['Lundi 10h30-11h00', 'Mardi 10h30-11h00', 'Mercredi 10h30-11h00', 'Jeudi 10h30-11h00', 'Vendredi 10h30-11h00', 'Samedi 10h30-11h00', 'Dimanche 10h30-11h00'],
                        ['Lundi 11h00-11h30', 'Mardi 11h00-11h30', 'Mercredi 11h00-11h30', 'Jeudi 11h00-11h30', 'Vendredi 11h00-11h30', 'Samedi 11h00-11h30', 'Dimanche 11h00-11h30'],
                        ['Lundi 11h30-12h00', 'Mardi 11h30-12h00', 'Mercredi 11h30-12h00', 'Jeudi 11h30-12h00', 'Vendredi 11h30-12h00', 'Samedi 11h30-12h00', 'Dimanche 11h30-12h00'],
                        ['Lundi 12h00-12h30', 'Mardi 12h00-12h30', 'Mercredi 12h00-12h30', 'Jeudi 12h00-12h30', 'Vendredi 12h00-12h30', 'Samedi 12h00-12h30', 'Dimanche 12h00-12h30'],
                        ['Lundi 12h30-13h00', 'Mardi 12h30-13h00', 'Mercredi 12h30-13h00', 'Jeudi 12h30-13h00', 'Vendredi 12h30-13h00', 'Samedi 12h30-13h00', 'Dimanche 12h30-13h00'],
                        ['Lundi 13h00-13h30', 'Mardi 13h00-13h30', 'Mercredi 13h00-13h30', 'Jeudi 13h00-13h30', 'Vendredi 13h00-13h30', 'Samedi 13h00-13h30', 'Dimanche 13h00-13h30'],
                        ['Lundi 13h30-14h00', 'Mardi 13h30-14h00', 'Mercredi 13h30-14h00', 'Jeudi 13h30-14h00', 'Vendredi 13h30-14h00', 'Samedi 13h30-14h00', 'Dimanche 13h30-14h00'],
                        ['Lundi 14h00-14h30', 'Mardi 14h00-14h30', 'Mercredi 14h00-14h30', 'Jeudi 14h00-14h30', 'Vendredi 14h00-14h30', 'Samedi 14h00-14h30', 'Dimanche 14h00-14h30'],
                        ['Lundi 14h30-15h00', 'Mardi 14h30-15h00', 'Mercredi 14h30-15h00', 'Jeudi 14h30-15h00', 'Vendredi 14h30-15h00', 'Samedi 14h30-15h00', 'Dimanche 14h30-15h00'],
                        ['Lundi 15h00-15h30', 'Mardi 15h00-15h30', 'Mercredi 15h00-15h30', 'Jeudi 15h00-15h30', 'Vendredi 15h00-15h30', 'Samedi 15h00-15h30', 'Dimanche 15h00-15h30'],
                        ['Lundi 15h30-16h00', 'Mardi 15h30-16h00', 'Mercredi 15h30-16h00', 'Jeudi 15h30-16h00', 'Vendredi 15h30-16h00', 'Samedi 15h30-16h00', 'Dimanche 15h30-16h00'],
                        ['Lundi 16h00-16h30', 'Mardi 16h00-16h30', 'Mercredi 16h00-16h30', 'Jeudi 16h00-16h30', 'Vendredi 16h00-16h30', 'Samedi 16h00-16h30', 'Dimanche 16h00-16h30'],
                        ['Lundi 16h30-17h00', 'Mardi 16h30-17h00', 'Mercredi 16h30-17h00', 'Jeudi 16h30-17h00', 'Vendredi 16h30-17h00', 'Samedi 16h30-17h00', 'Dimanche 16h30-17h00'],
                        ['Lundi 17h00-17h30', 'Mardi 17h00-17h30', 'Mercredi 17h00-17h30', 'Jeudi 17h00-17h30', 'Vendredi 17h00-17h30', 'Samedi 17h00-17h30', 'Dimanche 17h00-17h30'],
                        ['Lundi 17h30-18h00', 'Mardi 17h30-18h00', 'Mercredi 17h30-18h00', 'Jeudi 17h30-18h00', 'Vendredi 17h30-18h00', 'Samedi 17h30-18h00', 'Dimanche 17h30-18h00'],
                        ['Lundi 18h00-18h30', 'Mardi 18h00-18h30', 'Mercredi 18h00-18h30', 'Jeudi 18h00-18h30', 'Vendredi 18h00-18h30', 'Samedi 18h00-18h30', 'Dimanche 18h00-18h30'],
                        ['Lundi 18h30-19h00', 'Mardi 18h30-19h00', 'Mercredi 18h30-19h00', 'Jeudi 18h30-19h00', 'Vendredi 18h30-19h00', 'Samedi 18h30-19h00', 'Dimanche 18h30-19h00'],
                        ['Lundi 19h00-19h30', 'Mardi 19h00-19h30', 'Mercredi 19h00-19h30', 'Jeudi 19h00-19h30', 'Vendredi 19h00-19h30', 'Samedi 19h00-19h30', 'Dimanche 19h00-19h30'],
                        ['Lundi 19h30-20h00', 'Mardi 19h30-20h00', 'Mercredi 19h30-20h00', 'Jeudi 19h30-20h00', 'Vendredi 19h30-20h00', 'Samedi 19h30-20h00', 'Dimanche 19h30-20h00'],
                        ['Lundi 20h00-20h30', 'Mardi 20h00-20h30', 'Mercredi 20h00-20h30', 'Jeudi 20h00-20h30', 'Vendredi 20h00-20h30', 'Samedi 20h00-20h30', 'Dimanche 20h00-20h30'],
                        ['Lundi 20h30-21h00', 'Mardi 20h30-21h00', 'Mercredi 20h30-21h00', 'Jeudi 20h30-21h00', 'Vendredi 20h30-21h00', 'Samedi 20h30-21h00', 'Dimanche 20h30-21h00'],

                    ]

      const [daysPossible, setDaysPossible] = useState([]);
      const [daysReserved, setDaysReserved] = useState([])
      const [isAvailable, setIsAvailable]= useState(false)
      const [isReserved, setIsReserved]=useState(false)
      const [day, setDay] = useState('');
      const [isLoading, setIsLoading] = useState(true);
      const [startDate, setStartDate] = useState(new Date());
      const [endDate, setEndDate] = useState(new Date());
      const [availability, setAvailability]=useState({from:"", to:""});
      const {state, dispatch} = useTutor();
      //const {from, to} = state.form.availability;

      //console.log(from, to)
      

      useEffect(() => {
      const fetchDays = async () => {
          try {
            const response = await axios.get(`https://skolaboard-app.herokuapp.com/api/tutor/`+ userInfo.userInfo.id)
             
                 //console.log("?????",response.data.daysPossible)
//alert(JSON.stringify(response.data.daysPossible))

let availableSlots = response.data.daysPossible;
let reservedSlots = response.data.daysReserved;
setDaysReserved(response.data.daysReserved)
setAvailability({from:response.data.availability.from, to: response.data.availability.to});
setStartDate(new Date(response.data.availability.from));
setEndDate(new Date(response.data.availability.to));

let newCells = [...cells];
//console.log("newcells",newCells)
// Loop for available slots : put true to cells 
for (let i=0; i < tableDays.length; i++) {
    for (let j = 0; j < tableDays.length; j++) {
        for (let k = 0; k < availableSlots.length; k++) {
            if (tableDays[i][j] ===(availableSlots[k])) {
                newCells[i][j] = true
                //console.log(newCells[i][j])
            }
            
        }
        
    }
}

// Loop for reserved slots : put true to cells 
let newReservedCells = [...reservedCells]
for (let i=0; i < tableDays.length; i++) {
    for (let j = 0; j < tableDays.length; j++) {
        for (let k = 0; k < reservedSlots.length; k++) {
            if (tableDays[i][j] ===(reservedSlots[k])) {
                newCells[i][j] = true
                newReservedCells[i][j]=true
                //console.log(newCells[i][j])
            }
            
        }
        
    }
}

setCells(newCells)
setReservedCells(newReservedCells)

           
          }
          catch (error) {
              console.log(error.message)
          }

      }
      setIsLoading(false)
      fetchDays()
    }, [userInfo.userInfo, isLoading]);

 //  console.log(daysReserved.find(x=> x.includes('Mercredi 14h00-14h30')))
 //  console.log(daysReserved)
      const handleChange = (cells) => {
   
setCells(cells)

      }
   // console.log("cells", cells)

    useEffect(()=> {
        const transfTable = () => {
  let initial = []       
for (let i=0; i < cells.length; i ++ ) {
    for (let j=0; j < cells.length; j++) {
        if (cells[i][j] === true && reservedCells[i][j] === false) {
initial.push(tableDays[i][j])
        }
    }
}
setDaysPossible(initial)
const initialstate = cells
}
  transfTable()
        
    }, [cells])
    //console.log(daysPossible)

    const handleClick = async () => {
console.log(userInfo.userInfo.token)
        try {

        
        const response = await axios.put('https://skolaboard-app.herokuapp.com/api/tutor/settings/update/'+ userInfo.userInfo.id, {daysPossible:daysPossible, availability:{from:startDate, to:endDate}},
        {
          headers: {
            Authorization: "Bearer " + userInfo.userInfo.token,
          "Content-Type": "application/json", 
            
          },
          
        })

    }
    catch (error) {
        console.log(error.message)
    }

    };

/*     useEffect(()=> {
const setAvailabilityFunc = () => {
    setAvailability({from:startDate, to : endDate})
}

setAvailabilityFunc()

    }, [startDate, endDate]);

    console.log(availability)
 */
// Function to transform dates ISO i date FNS

const formatDate = (val) => {
    return format (new Date(val),
    'dd/MM/yyyy')
}


const handleChangeStartDate = (date) => {
  if (date) {
    setStartDate(date) 
  }
 
}
const handleChangeEndDate = (date) => {
  if (date) {
    setEndDate(date) 
  }
 
}

  


    /* const MyContainer = ({ className, children }) => {
        return (
          <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
            <CalendarContainer className={className}>
              <div style={{ background: "#f0f0f0" }}>
                What is your favorite day?
              </div>
              <div style={{ position: "relative", top:"200px", left:"200px" }}>{children}</div>
            </CalendarContainer>
          </div>
        );
      }; */

    return (
        isLoading ? (<span>Loading availabilities...</span>):(

        
        <div style = {{margin:'auto', paddingTop:'15px'}}>
            <Container fluid /* style = {{width:'650px', display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', padding:'1rem'}} */>

                <Row>


<Col >    
                <span>Du : </span>
            <DatePicker
        selected={startDate}
        onChange={handleChangeStartDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholder = "Sélectionner la date de début"
        locale='fr'
        dateFormat="dd/MM/yyyy"
        closeOnScroll={true}
        popperPlacement="bottom-end"
        popperModifiers={{
          offset: {
            enabled: true,
            offset: "5px, 10px"
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: "viewport"
          }
        }}
      />
      </Col> 
      <Col>
      <span>Au : </span>
      <DatePicker
        onChange={handleChangeEndDate}
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholder = "Sélectionner la date de fin"
        locale='fr'
        dateFormat="dd/MM/yyyy"
        closeOnScroll={true}
        popperPlacement="bottom-end"
        popperModifiers={{
          offset: {
            enabled: true,
            offset: "5px, 10px"
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: "viewport"
          }
        }}
      />
      </Col> 
      <Col>
      <Button size='sm' type = 'submit' onClick = {handleClick}>Sauvegarder</Button>
      </Col>
      </Row> 
            <br/>

            <TableDragSelect id='table'
            className='table-drag-select card_style'
            value = {cells}
            onChange={handleChange}>
                <thead>
        <th disabled>Lundi</th> 
        <th disabled>Mardi</th> 
        <th disabled>Mercredi</th>
        <th disabled>Jeudi</th>
        <th disabled>Vendredi</th>
        <th disabled>Samedi</th>
        <th disabled>Dimanche</th>
      </thead>
      <tr className='table-row-heigth'>
        <td className = {daysReserved.find(x=> x.includes('Lundi 8h00-8h30'))==='Lundi 8h00-8h30' && 'cell-reserved'} disabled = {daysReserved.includes('Lundi 8h00-8h30') === true && true}>8h00</td>
        <td className = {daysReserved.find(x=> x.includes('Mardi 8h00-8h30'))==='Mardi 8h00-8h30' && 'cell-reserved'}>8h00</td >
        <td className = {daysReserved.find(x=> x.includes('Mercredi 8h00-8h30'))==='Mercredi 8h00-8h30' && 'cell-reserved'}>8h00</td>
        <td className = {daysReserved.find(x=> x.includes('Jeudi 8h00-8h30'))==='Jeudi 8h00-8h30' && 'cell-reserved'}>8h00</td>
        <td className = {daysReserved.find(x=> x.includes('Vendredi 8h00-8h30'))==='Vendredi 8h00-8h30' && 'cell-reserved'}>8h00</td>
        <td className = {daysReserved.find(x=> x.includes('Samedi 8h00-8h30'))==='Samedi 8h00-8h30' && 'cell-reserved'} disabled>8h00</td>
        <td className = {daysReserved.find(x=> x.includes('Dimanche 8h00-8h30'))==='Dimanche 8h00-8h30' && 'cell-reserved'}>8h00</td>
      </tr>
      <tr>
        <td className = {daysReserved.find(x=> x.includes('Lundi 8h30-9h00'))==='Lundi 8h30-9h00' && 'cell-reserved'}>8h30</td>
        <td className = {daysReserved.find(x=> x.includes('Mardi 8h30-9h00'))==='Mardi 8h30-9h00' && 'cell-reserved'}>8h30</td>
        <td className = {daysReserved.find(x=> x.includes('Mercredi 8h30-9h00'))==='Mercredi 8h30-9h00' && 'cell-reserved'}>8h30</td>
        <td className = {daysReserved.includes('Jeudi 8h30-9h00') && 'cell-reserved'}>8h30</td>
        <td className = {daysReserved.find(x=> x.includes('Vendredi 8h30-9h00'))==='Vendredi 8h30-9h00' && 'cell-reserved'}>8h30</td>
        <td className = {daysReserved.find(x=> x.includes('Samedi 8h30-9h00'))==='Samedi 8h30-9h00' && 'cell-reserved'} disabled>8h30</td>
        <td className = {daysReserved.find(x=> x.includes('Dimanche 8h30-9h00'))==='Dimanche 8h30-9h00' && 'cell-reserved'}>8h30</td>
      </tr>
      <tr>
        <td className = {daysReserved.find(x=> x.includes('Lundi 9h00-9h30'))==='Lundi 9h00-9h30' && 'cell-reserved'}>9h00</td>
        <td className = {daysReserved.find(x=> x.includes('Mardi 9h00-9h30'))==='Mardi 9h00-9h30' && 'cell-reserved'}>9h00</td>
        <td className = {daysReserved.find(x=> x.includes('Mercredi 9h00-9h30'))==='Mercredi 9h00-9h30' && 'cell-reserved'}>9h00</td>
        <td className = {daysReserved.find(x=> x.includes('Jeudi 9h00-9h30'))==='Jeudi 9h00-9h30' && 'cell-reserved'}>9h00</td>
        <td className = {daysReserved.find(x=> x.includes('Vendredi 9h00-9h30'))==='Vendredi 9h00-9h30' && 'cell-reserved'}>9h00</td>
        <td className = {daysReserved.find(x=> x.includes('Samedi 9h00-9h30'))==='Samedi 9h00-9h30' && 'cell-reserved'} disabled>9h00</td>
        <td className = {daysReserved.find(x=> x.includes('Dimanche 9h00-9h30'))==='Dimanche 9h00-9h30' && 'cell-reserved'}>9h00</td>
      
      </tr>
      <tr>
        <td className = {daysReserved.find(x=> x.includes('Lundi 9h30-10h00'))==='Lundi 9h30-10h00' && 'cell-reserved'}>9h30</td>
        <td className = {daysReserved.find(x=> x.includes('Mardi 9h30-10h00'))==='Mardi 9h30-10h00' && 'cell-reserved'}>9h30</td>
        <td className = {daysReserved.find(x=> x.includes('Mercredi 9h30-10h00'))==='Mercredi 9h30-10h00' && 'cell-reserved'}>9h30</td>
        <td className = {daysReserved.find(x=> x.includes('Jeudi 9h30-10h00'))==='Jeudi 9h30-10h00' && 'cell-reserved'}>9h30</td>
        <td className = {daysReserved.find(x=> x.includes('Vendredi 9h30-10h00'))==='Vendredi 9h30-10h00' && 'cell-reserved'}>9h30</td>
        <td className = {daysReserved.find(x=> x.includes('Samedi 9h30-10h00'))==='Samedi 9h30-10h00' && 'cell-reserved'} disabled>9h30</td>
        <td className = {daysReserved.find(x=> x.includes('Dimanche 9h30-10h00'))==='Dimanche 9h30-10h00' && 'cell-reserved'}>9h30</td>
      
      </tr>
      <tr>
        <td className = {daysReserved.find(x=> x.includes('Lundi 10h00-10h30'))==='Lundi 10h00-10h30' && 'cell-reserved'}>10h00</td>
        <td className = {daysReserved.find(x=> x.includes('Mardi 10h00-10h30'))==='Mardi 10h00-10h30' && 'cell-reserved'}>10h00</td>
        <td className = {daysReserved.find(x=> x.includes('Mercredi 10h00-10h30'))==='Mercredi 10h00-10h30' && 'cell-reserved'}>10h00</td>
        <td className = {daysReserved.find(x=> x.includes('Jeudi 10h00-10h30'))==='Jeudi 10h00-10h30' && 'cell-reserved'}>10h00</td>
        <td className = {daysReserved.find(x=> x.includes('Vendredi 10h00-10h30'))==='Vendredi 10h00-10h30' && 'cell-reserved'}>10h00</td>
        <td className = {daysReserved.find(x=> x.includes('Samedi 10h00-10h30'))==='Samedi 10h00-10h30' && 'cell-reserved'} disabled>10h00</td>
        <td className = {daysReserved.find(x=> x.includes('Dimanche 10h00-10h30'))==='Dimanche 10h00-10h30' && 'cell-reserved'}>10h00</td>
      </tr>
      <tr>
        <td className = {daysReserved.find(x=> x.includes('Lundi 10h30-11h00'))==='Lundi 10h30-11h00' && 'cell-reserved'}>10h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 10h30-11h00'))==='Mardi 10h30-11h00' && 'cell-reserved'}>10h30</td>
        <td style = {daysReserved && daysReserved.includes('Mercredi 10h30-11h00')=== true  ? {backgroundColor: 'rgb(238, 22, 73)', color : 'yellow'} : null} disabled = {daysReserved.includes('Mercredi 10h30-11h00')=== true && true}> 10h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 10h30-11h00'))==='Jeudi 10h30-11h00' && 'cell-reserved'}>10h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 10h30-11h00'))==='Vendredi 10h30-11h00' && 'cell-reserved'}>10h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 10h30-11h00'))==='Samedi 10h30-11h00' && 'cell-reserved'} disabled>10h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 10h30-11h00'))==='Dimanche 10h30-11h00' && 'cell-reserved'}>10h30</td>
  
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 11h00-11h30'))==='Lundi 11h00-11h30' && 'cell-reserved'}>11h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 11h00-11h30'))==='Mardi 11h00-11h30' && 'cell-reserved'}>11h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 11h00-11h30'))==='Mercredi 11h00-11h30' && 'cell-reserved'}>11h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 11h00-11h30'))==='Jeudi 11h00-11h30' && 'cell-reserved'}>11h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 11h00-11h30'))==='Vendredi 11h00-11h30' && 'cell-reserved'}>11h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 11h00-11h30'))==='Samedi 11h00-11h30' && 'cell-reserved'} disabled>11h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 11h00-11h30'))==='Dimanche 11h00-11h30' && 'cell-reserved'}>11h00</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 11h30-12h00'))==='Lundi 11h30-12h00' && 'cell-reserved'}>11h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 11h30-12h00'))==='Mardi 11h30-12h00' && 'cell-reserved'}>11h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 11h30-12h00'))==='Mercredi 11h30-12h00' && 'cell-reserved'}>11h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 11h30-12h00'))==='Jeudi 11h30-12h00' && 'cell-reserved'}>11h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 11h30-12h00'))==='Vendredi 11h30-12h00' && 'cell-reserved'}>11h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 11h30-12h00'))==='Samedi 11h30-12h00' && 'cell-reserved'} disabled>11h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 11h30-12h00'))==='Dimanche 11h30-12h00' && 'cell-reserved'}>11h30</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 12h00-12h30'))==='Lundi 12h00-12h30' && 'cell-reserved'}>12h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 12h00-12h30'))==='Mardi 12h00-12h30' && 'cell-reserved'}>12h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 12h00-12h30'))==='Mercredi 12h00-12h30' && 'cell-reserved'}>12h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 12h00-12h30'))==='Jeudi 12h00-12h30' && 'cell-reserved'}>12h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 12h00-12h30'))==='Vendredi 12h00-12h30' && 'cell-reserved'}>12h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 12h00-12h30'))==='Samedi 12h00-12h30' && 'cell-reserved'} disabled>12h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 12h00-12h30'))==='Dimanche 12h00-12h30' && 'cell-reserved'}>12h00</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 12h30-13h00'))==='Lundi 12h30-13h00' && 'cell-reserved'}>12h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 12h30-13h00'))==='Mardi 12h30-13h00' && 'cell-reserved'}>12h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 12h30-13h00'))==='Mercredi 12h30-13h00' && 'cell-reserved'}>12h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 12h30-13h00'))==='Jeudi 12h30-13h00' && 'cell-reserved'}>12h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 12h30-13h00'))==='Vendredi 12h30-13h00' && 'cell-reserved'}>12h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 12h30-13h00'))==='Samedi 12h30-13h00' && 'cell-reserved'} disabled>12h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 12h30-13h00'))==='Dimanche 12h30-13h00' && 'cell-reserved'}>12h30</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 13h00-13h30'))==='Lundi 13h00-13h30' && 'cell-reserved'}>13h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 13h00-13h30'))==='Mardi 13h00-13h30' && 'cell-reserved'}>13h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 13h00-13h30'))==='Mercredi 13h00-13h30' && 'cell-reserved'}>13h00</td>
        <td classeName = {daysReserved.includes('Jeudi 13h00-13h30') && 'cell-reserved'}>13h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 13h00-13h30'))==='Vendredi 13h00-13h30' && 'cell-reserved'}>13h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 13h00-13h30'))==='Samedi 13h00-13h30' && 'cell-reserved'} disabled>13h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 13h00-13h30'))==='Dimanche 13h00-13h30' && 'cell-reserved'}>13h00</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 13h30-14h00'))==='Lundi 13h30-14h00' && 'cell-reserved'}>13h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 13h30-14h00'))==='Mardi 13h30-14h00' && 'cell-reserved'}>13h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 13h30-14h00'))==='Mercredi 13h30-14h00' && 'cell-reserved'}>13h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 13h30-14h00'))==='Jeudi 13h30-14h00' && 'cell-reserved'}>13h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 13h30-14h00'))==='Vendredi 13h30-14h00' && 'cell-reserved'}>13h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 13h30-14h00'))==='Samedi 13h30-14h00' && 'cell-reserved'} disabled>13h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 13h30-14h00'))==='Dimanche 13h30-14h00' && 'cell-reserved'}>13h30</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 14h00-14h30'))==='Lundi 14h00-14h30' && 'cell-reserved'}>14h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 14h00-14h30'))==='Mardi 14h00-14h30' && 'cell-reserved'}>14h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 14h00-14h30'))==='Mercredi 14h00-14h30' && 'cell-reserved'}>14h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 14h00-14h30'))==='Jeudi 14h00-14h30' && 'cell-reserved'}>14h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 14h00-14h30'))==='Vendredi 14h00-14h30' && 'cell-reserved'}>14h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 14h00-14h30'))==='Samedi 14h00-14h30' && 'cell-reserved'} disabled>14h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 14h00-14h30'))==='Dimanche 14h00-14h30' && 'cell-reserved'}>14h00</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 14h30-15h00'))==='Lundi 14h30-15h00' && 'cell-reserved'}>14h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 14h30-15h00'))==='Mardi 14h30-15h00' && 'cell-reserved'}>14h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 14h30-15h00'))==='Mercredi 14h30-15h00' && 'cell-reserved'}>14h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 14h30-15h00'))==='Jeudi 14h30-15h00' && 'cell-reserved'}>14h30</td>
        <td  classeName = {daysReserved.find(x=> x.includes('Vendredi 14h30-15h00'))==='Vendredi 14h30-15h00' && 'cell-reserved'}>14h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 14h30-15h00'))==='Samedi 14h30-15h00' && 'cell-reserved'} disabled>14h30</td>
        <td  classeName = {daysReserved.find(x=> x.includes('Dimanche 14h30-15h00'))==='Dimanche 14h30-15h00' && 'cell-reserved'}>14h30</td>
        </tr>
        <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 15h00-15h30'))==='Lundi 15h00-15h30' && 'cell-reserved'}>15h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 15h00-15h30'))==='Mardi 15h00-15h30' && 'cell-reserved'}>15h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 15h00-15h30'))==='Mercredi 15h00-15h30' && 'cell-reserved'}>15h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 15h00-15h30'))==='Jeudi 15h00-15h30' && 'cell-reserved'}>15h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 15h00-15h30'))==='Vendredi 15h00-15h30' && 'cell-reserved'}>15h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 15h00-15h30'))==='Samedi 15h00-15h30' && 'cell-reserved'} disabled>15h00</td>
        <td  classeName = {daysReserved.find(x=> x.includes('Dimanche 15h00-15h30'))==='Dimanche 15h00-15h30' && 'cell-reserved'}>15h00</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 15h30-16h00'))==='Lundi 15h30-16h00' && 'cell-reserved'}>15h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 15h30-16h00'))==='Mardi 15h30-16h00' && 'cell-reserved'}>15h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 15h30-16h00'))==='Mercredi 15h30-16h00' && 'cell-reserved'}>15h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 15h30-16h00'))==='Jeudi 15h30-16h00' && 'cell-reserved'}>15h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 15h30-16h00'))==='Vendredi 15h30-16h00' && 'cell-reserved'}>15h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 15h30-16h00'))==='Samedi 15h30-16h00' && 'cell-reserved'} disabled>15h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 15h30-16h00'))==='Dimanche 15h30-16h00' && 'cell-reserved'}>15h30</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 16h00-16h30'))==='Lundi 16h00-16h30' && 'cell-reserved'}>16h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 16h00-16h30'))==='Mardi 16h00-16h30' && 'cell-reserved'}>16h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 16h00-16h30'))==='Mercredi 16h00-16h30' && 'cell-reserved'}>16h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 16h00-16h30'))==='Jeudi 16h00-16h30' && 'cell-reserved'}>16h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 16h00-16h30'))==='Vendredi 16h00-16h30' && 'cell-reserved'}>16h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 16h00-16h30'))==='Samedi 16h00-16h30' && 'cell-reserved'} disabled>16h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 16h00-16h30'))==='Dimanche 16h00-16h30' && 'cell-reserved'}>16h00</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 16h30-17h00'))==='Lundi 16h30-17h00' && 'cell-reserved'}>16h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 16h30-17h00'))==='Mardi 16h30-17h00' && 'cell-reserved'}>16h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 16h30-17h00'))==='Mercredi 16h30-17h00' && 'cell-reserved'}>16h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 16h30-17h00'))==='Jeudi 16h30-17h00' && 'cell-reserved'}>16h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 16h30-17h00'))==='Vendredi 16h30-17h00' && 'cell-reserved'}>16h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 16h30-17h00'))==='Samedi 16h30-17h00' && 'cell-reserved'} disabled>16h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 16h30-17h00'))==='Dimanche 16h30-17h00' && 'cell-reserved'}>16h30</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 17h00-17h30'))==='Lundi 17h00-17h30' && 'cell-reserved'}>17h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 17h00-17h30'))==='Mardi 17h00-17h30' && 'cell-reserved'}>17h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 17h00-17h30'))==='Mercredi 17h00-17h30' && 'cell-reserved'}>17h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 17h00-17h30'))==='Jeudi 17h00-17h30' && 'cell-reserved'}>17h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 17h00-17h30'))==='Vendredi 17h00-17h30' && 'cell-reserved'}>17h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 17h00-17h30'))==='Samedi 17h00-17h30' && 'cell-reserved'} disabled>17h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 17h00-17h30'))==='Dimanche 17h00-17h30' && 'cell-reserved'}>17h00</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 17h30-18h00'))==='Lundi 17h30-18h00' && 'cell-reserved'}>17h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 17h30-18h00'))==='Merdi 17h30-18h00' && 'cell-reserved'}>17h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 17h30-18h00'))==='Mercredi 17h30-18h00' && 'cell-reserved'}>17h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 17h30-18h00'))==='Jeudi 17h30-18h00' && 'cell-reserved'}>17h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 17h30-18h00'))==='Vendredi 17h30-18h00' && 'cell-reserved'}>17h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 17h30-18h00'))==='Samedi 17h30-18h00' && 'cell-reserved'} disabled>17h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 17h30-18h00'))==='Dimanche 17h30-18h00' && 'cell-reserved'}>17h30</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.includes('Lundi 18h00-18h30') && 'cell-reserved' }>18h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 18h00-18h30'))==='Mardi 18h00-18h30' && 'cell-reserved'}>18h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 18h00-18h30'))==='Mercredi 18h00-18h30' && 'cell-reserved'}>18h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 18h00-18h30'))==='Jeudi 18h00-18h30' && 'cell-reserved'}>18h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 18h00-18h30'))==='Vendredi 18h00-18h30' && 'cell-reserved'}>18h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 18h00-18h30'))==='Samedi 18h00-18h30' && 'cell-reserved'} disabled>18h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 18h00-18h30'))==='Dimanche 18h00-18h30' && 'cell-reserved'}>18h00</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 18h30-19h00'))==='Lundi 18h30-19h00' && 'cell-reserved'}>18h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 18h30-19h00'))==='Mardi 18h30-19h00' && 'cell-reserved'}>18h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 18h30-19h00'))==='Mercredi 18h30-19h00' && 'cell-reserved'}>18h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 18h30-19h00'))==='Jeudi 18h30-19h00' && 'cell-reserved'}>18h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 18h30-19h00'))==='Vendredi 18h30-19h00' && 'cell-reserved'}>18h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 18h30-19h00'))==='Samedi 18h30-19h00' && 'cell-reserved'} disabled>18h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 18h30-19h00'))==='Dimanche 18h30-19h00' && 'cell-reserved'}>218h30</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 19h00-19h30'))==='Lundi 19h00-19h30' && 'cell-reserved'}>19h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 19h00-19h30'))==='Mardi 19h00-19h30' && 'cell-reserved'}>19h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 19h00-19h30'))==='Mercredi 19h00-19h30' && 'cell-reserved'}>19h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 19h00-19h30'))==='Jeudi 19h00-19h30' && 'cell-reserved'}>19h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 19h00-19h30'))==='Vendredi 19h00-19h30' && 'cell-reserved'}>19h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 19h00-19h30'))==='Samedi 19h00-19h30' && 'cell-reserved'} disabled>19h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 19h00-19h30'))==='Dimanche 19h00-19h30' && 'cell-reserved'}>19h00</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 19h30-20h00'))==='Lundi 19h30-20h00' && 'cell-reserved'}>19h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 19h30-20h00'))==='Mardi 19h30-20h00' && 'cell-reserved'}>19h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 19h30-20h00'))==='Mercredi 19h30-20h00' && 'cell-reserved'}>19h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 19h30-20h00'))==='Jeudi 19h30-20h00' && 'cell-reserved'}>19h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 19h30-20h00'))==='Vendredi 19h30-20h00' && 'cell-reserved'}>19h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 19h30-20h00'))==='Samedi 19h30-20h00' && 'cell-reserved'} disabled>19h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 19h30-20h00'))==='Dimanche 19h30-20h00' && 'cell-reserved'}>19h30</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 20h00-20h30'))==='Lundi 20h00-20h30' && 'cell-reserved'}>20h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 20h00-20h30'))==='Mardi 20h00-20h30' && 'cell-reserved'}>20h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 20h00-20h30'))==='Mercredi 20h00-20h30' && 'cell-reserved'}>20h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 20h00-20h30'))==='Jeudi 20h00-20h30' && 'cell-reserved'}>20h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 20h00-20h30'))==='Vendredi 20h00-20h30' && 'cell-reserved'}>20h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 20h00-20h30'))==='Samedi 20h00-20h30' && 'cell-reserved'} disabled>20h00</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 20h00-20h30'))==='Dimanche 20h00-20h30' && 'cell-reserved'}>20h00</td>
      </tr>
      <tr>
        <td classeName = {daysReserved.find(x=> x.includes('Lundi 20h30-21h00'))==='Lundi 20h30-21h00' && 'cell-reserved'}>20h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mardi 20h30-21h00'))==='Mardi 20h30-21h00' && 'cell-reserved'}>20h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Mercredi 20h30-21h00'))==='Mercredi 20h30-21h00' && 'cell-reserved'}>20h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Jeudi 20h30-21h00'))==='Jeudi 20h30-21h00' && 'cell-reserved'}>20h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Vendredi 20h30-21h00'))==='Vendredi 20h30-21h00' && 'cell-reserved'}>20h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Samedi 20h30-21h00'))==='Samedi 20h30-21h00' && 'cell-reserved'} disabled>20h30</td>
        <td classeName = {daysReserved.find(x=> x.includes('Dimanche 20h30-21h00'))==='Dimanche 20h30-21h00' && 'cell-reserved'}>20h30</td>
      </tr>
      
    </TableDragSelect>
    
    </Container>
        </div>
    )
    )
}

export default TutorAvailability
