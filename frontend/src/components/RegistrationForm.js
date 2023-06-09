import React, {Fragment,useState,useEffect} from 'react'

const RegistrationForm = () =>{
    return(
        <div>
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
					<div className='field'>
					<label>Требуемые навыки:</label>
					<input type="text" name="skills" value={skills} onChange={changeHandler}/>
					</div>
					<div className='field'>
					<label>Краткое описание:</label>
					<input className='short-desk' type="text" name="desc" value={desc} onChange={changeHandler}/>
					</div>
					<div className='buttons-container'>
					<button onClick={sendData} className='submit' >Сохранить</button>
					<button className='close-modal' onClick={toggleModal}>Закрыть</button>
					</div>
                    </div>
        </div>
    )
}

export default RegistrationForm