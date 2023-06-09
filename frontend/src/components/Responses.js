import React, {Fragment,useState,useEffect} from 'react'
import "../CSS/Responses.css"

const Responses = () =>{

    let [responses,setResponses] = useState([]);
    
    useEffect(()=>{
        
        getResponses()
    },[])
    let getResponses = async() =>{
        const storedToken1 = localStorage.getItem('token');
          let response = await fetch('http://127.0.0.1:8000/api/getResponses/',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Token ${storedToken1}`
        }
       })
       
       let data = await response.json()
       setResponses(data)
       console.log(responses)
    }

    
    return(
        <div className='responses-container'>
            <table>
           
        <tr>
          <th>Название мероприятия</th>
          <th>Дата</th>
          <th>Время</th>
          <th>Волонтер</th>
          <th>Электронная почта волонтера</th>
        </tr>
        {responses.map((response,index)=>(
        <tr>
          <td>{response.event.name}</td>
          <td>{response.event.date}</td>
          <td>{(response.event.time).slice(0,-3)}</td>
          <td>{response.user.name + " " +response.user.surname}</td>
          
          <td>{response.user.email}</td>
        </tr>
        ))}
       
      </table>
        </div>
    )
}

export default Responses