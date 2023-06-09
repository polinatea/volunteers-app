import React, {Fragment,useState,useEffect} from 'react'
import "../CSS/ListView.css"
const ListNote = () =>{

    //updating state
    let [events,setNotes] = useState([]);
    let [suggestedEvents,setSuggestedEvents] = useState([]);
    let [attendees,setAttendees] = useState([]);

    let chosenEvent={eventId:""};
    useEffect(()=>{
        // calling get notes
        getNotes()
        getSuggestedEvents()
        getAttendees()
    },[])


    function addEvent(id_ev){
        const mytoken = localStorage.getItem('token');
        chosenEvent.eventId = id_ev;
     
		fetch('http://127.0.0.1:8000/api/attendEvent/',{
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${mytoken}`,
			},
			body: JSON.stringify(chosenEvent),
		})

			console.log("event added",chosenEvent);
    }

    let getNotes = async() =>{
    // getting notes
        const storedToken = localStorage.getItem('token');
       let response = await fetch('http://127.0.0.1:8000/api/events/',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Token ${storedToken}`
        }
       })
      
       let data = await response.json()
       
       setNotes(data)
    }

    let getSuggestedEvents = async() =>{
        const storedToken1 = localStorage.getItem('token');
          let response = await fetch('http://127.0.0.1:8000/api/suggestedEvents/',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Token ${storedToken1}`
        }
       })
       
       let data1 = await response.json()
       setSuggestedEvents(data1)
    }


    let getAttendees = async() =>{
        const storedToken1 = localStorage.getItem('token');
          let response = await fetch('http://127.0.0.1:8000/api/getAttendees/',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Token ${storedToken1}`
        }
       })
       
       let attendees = await response.json()
       setAttendees(attendees)
       console.log(attendees)

    //    let attendeesAmount = {}
    //    for (let i = 0; i <attendees.length; i++){
    //     console.log("attendee", attendees[i])
    //     attendeesAmount[i.event] = null;
    //    }

    //    console.log("attendeesAmount",attendeesAmount)
    }

    
    return(
        <Fragment>
            <section className='listNote'>
                    <div className='suggested'>
                        <div className='suggested-section'>ПОДОБРАННЫЕ ДЛЯ ВАС:</div>
                    <div className='row'>

                    {suggestedEvents.map((event,index)=>( 
                        <div className='column'>

                        
                            <div className='single-listNote'>
                                <div className='card'>
                                    <div className='listNote-top'>
                                    {/* <img src="./images/bridge.jpg" alt="Image" /> */}
                                    </div>
                                    
                                    <div className='listNote-content'>
                                        
                                    <h3 className='event-name'>{event.event_name}</h3>
                                    <div className='date-time-container'>
                                    <p className='string-label'>Начало:</p>   
                                    <p>{event.date}</p>
                                    <p className='string-label'>в</p>
                                    <p>{(event.time).slice(0, -3)}</p>
                                    </div>
                                    <p>{event.address}</p>
                                    {typeof(attendees[event.id_event]) !=='undefined' &&
                                    <p>Пойдут: {attendees[event.id_event]} человек</p>
                                    }
                                    </div> 
                                    <div className='list-note-buttons'>
                                    
                                    {/* <button className='note-btn-no' id='no'>Не интересно</button> */}
                                    <button onClick={()=>addEvent(event.id_event) } className='note-btn-yes' id='yes' >Пойду!</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        ))}
                    </div>
                    </div>
                    <div>
                    <div className='suggested-section'>ВСЕ МЕРОПРИЯТИЯ:</div>
                    <div className='row'>
                    {events.map((event,index)=>( 
                       
                        <div className='column'>

                        
                            <div className='single-listNote'>
                                <div className='card'>
                                    <div className='listNote-top'>
                                    {/* <img src="./images/bridge.jpg" alt="Image" /> */}
                                    </div>
                                    
                                    <div className='listNote-content'>
                                        
                                    <h3 className='event-name'>{event.event_name}</h3>
                                    <div className='date-time-container'>
                                    <p className='string-label'>Начало:</p>   
                                    <p>{event.date}</p>
                                    <p className='string-label'>в</p>
                                    <p>{(event.time).slice(0, -3)}</p>
                                    </div>
                                    <p>{event.address}</p>
                                    {typeof(attendees[event.id_event]) !=='undefined' &&
                                    <p>Пойдут: {attendees[event.id_event]} человек</p>
                                    }
                                    </div> 
                                    <div className='list-note-buttons'>
                                    
                                    {/* <button className='note-btn-no' id='no'>Не интересно</button> */}
                                    <button onClick={()=>addEvent(event.id_event) } className='note-btn-yes' id='yes' >Пойду!</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        ))}
                       
                    </div>
                    </div>
            </section>
        </Fragment>
    )
}

export default ListNote