import React, {Fragment,useState,useEffect} from 'react'
import "../CSS/Profile.css"

export default function Profile(){

    let [person,setPerson] = useState([]);
    useEffect(()=>{
        // calling get notes
       getPerson()
    },[])

   let  getPerson = async() =>{
        // getting notes
            const storedToken = localStorage.getItem('token');
           let response = await fetch('http://127.0.0.1:8000/api/getUser/',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${storedToken}`
            }
           })
          
            let data = await response.json()
           
           setPerson(data)
           console.log(data)
        }

        function logout(){
            localStorage.removeItem('token');
            window.location.reload(true)
        }
    return <div className='userContainer'>
                <div className='userInfo'>
                    <div className='userPhoto'>
                        <img src="./images/user-image.png" alt="Image"    width= '200px' height ='200px'/>
                    </div>
                    <div className='userData'>
                        <div className='nameSurname'>
                            <div className='name'>
                                {person.name } 
                                
                            </div>
                            &nbsp;
                            <div className='surname'>
                                {person.surname}
                            </div>
                        </div>
                        <div className='aboutInfo'>
                            <div className='email'> 
                                <div className='email-label'>Почта: </div> 
                                <div>{person.email}</div>
                            </div>
                            <div className='skills'> 
                                <div className='skillsLabel'>
                                    Навыки:
                                </div> 
                                <div className='allSkills'>
                                {person.skills?.map((skill) =>
                                <div >
                                    {skill}
                                </div> 
                                )}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                   
                </div>

                <div className='userEvents'>

                </div>
                <div onClick={logout} className='logoutBtn'>Выйти <i class=" fa-solid fa-right-from-bracket"></i></div>
                
            </div>
}