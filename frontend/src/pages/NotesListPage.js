import React, {useState,useEffect} from 'react'
import ListNote from '../components/ListView'
import MapNote from '../components/MapView' 
import Responses from '../components/Responses' 
import "../CSS/EventsControl.css"

export const NotesListPage = (prop) => {

    const [active, setActive] = useState("List");
  return (
    <div className=''>
      <div className='control-box'>
      <div className='control-field'>
       
        <button className="control-button " onClick={()=> setActive("List")}>Лист <i class="fa-solid fa-list"></i></button>
        <button className="control-button" onClick={()=> setActive("Map")}>Карта <i class="fa-solid fa-location-dot"></i></button>
        <button className="response-button " onClick={()=> setActive("Responses")}>Отклики <i class="fa-regular fa-bell"></i></button>
      </div>
      
      </div>
      
      
      {active ==="Responses" && <Responses />}
      {active ==="List" && <ListNote token={prop.token}/>}
      {active ==="Map" && <MapNote />}
      
      
    </div>

  )
}
export default NotesListPage