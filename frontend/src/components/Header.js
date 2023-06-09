import React, {useState} from 'react'
import { Link } from "react-router-dom"

import "../CSS/Model.css"

const Header = () => {

	const [modal, setModal] = useState(false);
	const toggleModal = () =>{
		setModal(!modal)
		getOptions();
	}

	const [options, setOptions] = useState([]);

	const [selectedValues, setSelectedValues] = useState([]);

	const handleSelectChange = (event) => {
		console.log("ennnfs", event)
		const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
		setSelectedValues(selectedOptions);
		
	  }

    const [data, setData] = useState({
        title:"",
        date:"",
		time:"",
        address:"",
		skills:"",
		desc:"",
		photo:"",

    })
    const {title,date,time,address,skills,desc, photo} = data;
    // const [token, setToken] = useCookies(['mytoken'])

    const changeHandler = e => {
        setData({...data,[e.target.name]:e.target.value});
    }


	function sendData(){
		const mytoken = localStorage.getItem('token');
		
		fetch('http://127.0.0.1:8000/api/createEvent/',{
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${mytoken}`,
			},
			body: JSON.stringify(data),
		})			
	}

	let getOptions = async() =>{
    

		let response = await fetch('http://127.0.0.1:8000/api/getAllSkills/',{
			method: 'GET',
			headers:{
				'Content-Type': 'application/json',
			   
			}
		   })
	
		   let data = await response.json()
		   
		   setOptions(data)
		   setOptions(data.map(item => ({
			value: item.id_skill,
			label: item.skill_name
		  })));
		  console.log(data)
		   
	}

  return (
	<div>
    <nav className='nav'>
      <Link to='/' ><div className='site-title'> <div>КомпасДобра </div><i class="fa-regular fa-compass"></i></div></Link>
      <ul>
		<li className="add-event-button">
		<button className="addBtn" onClick={toggleModal}><i class="fa-solid fa-plus"></i></button>
		</li>
        <li>
          <Link to='/events'>
         
            <p>МЕРОПРИЯТИЯ</p>
          </Link>
          
        </li>
        {/* <li>
          <Link to='/chats'>
            
            <p>ЧАТЫ</p>
          </Link>
        </li> */}
        <li>
          <Link to='/profile'>
            
              <p>ПРОФИЛЬ</p>
          </Link>
        </li>
		<li>
          <Link to='/login'>
            
              <p>ЛОГИН</p>
          </Link>
        </li>
      </ul>
      </nav>
	  {modal &&(
	  <div className='modal'>
	  <div className='overlay' onClick={toggleModal}></div>
		  <div className='modal-content'>
			  <h2>Добавление мероприятия</h2>
			  
				
					<div className='field'>
						<label>Название мероприятия:</label>
						<input type="text" name="title" value={title} onChange={changeHandler}/>
					</div>
					<div className='field'>
						<label>Дата и время:</label>
						<div className='dateTime-container'>
						<input className='date' type="date" name='date' value={date} onChange={changeHandler}/>
						<input className='time' type="time" name='time' value={time} onChange={changeHandler}/>
						</div>
					</div>
					<div className='field'>
					<label>Адрес проведения:</label>
					<input type="text" name="address" value={address} onChange={changeHandler}/>
					</div>

					<div className='select-box'>
                    <div className='info-box'>
                <label>Навыки:</label>
                 
                <input type='text' name="skills" value={selectedValues.join(', ')} onChange={changeHandler} />
                </div>
                <select id="multiple-select" multiple onChange={handleSelectChange}>
                    {options.map(option => (
                    <option key={option.value} value={option.label}>{option.label}</option>
                    ))}
                </select>

                </div>

					<div className='field'>
					<label>Краткое описание:</label>
					<input className='short-desk' type="text" name="desc" value={desc} onChange={changeHandler}/>
					</div>

					<div> 
					<label>
						Photo:
						<input type="file" accept="image/*" onChange={changeHandler} />
					</label>
					</div>
					<div className='buttons-container'>
					<button onClick={sendData} className='submit' >Сохранить</button>
					<button className='close-modal' onClick={toggleModal}>Закрыть</button>
					</div>
				
			  

		  </div>
	  
	</div>
	  )}

	  </div>
  )
}

export default Header