 import React, {useState,} from 'react'
 import "../CSS/Login.css"


const Login = (props) => {

    const [options, setOptions] = useState([]);

      const [selectedValues, setSelectedValues] = useState([]);
      const [selectedKeys, setSelectedKeys] = useState([]);

  const handleSelectChange = (event) => {
    console.log("ennnfs", event)
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setSelectedValues(selectedOptions);
    
  }

    const [isVisible, setIsVisible] = useState(false);
    const [isDivVisible, setDivVisible] = useState(true);

    const handleLoginFormVisibility = () =>{
        setDivVisible(false);
    }
    const handleButtonClick = () => {
      setIsVisible(true);
      getOptions();
      handleLoginFormVisibility();
      
    };

    const [data, setData] = useState({
        name:"",
        surname:"",
        email:"",
        username:"",
        password:"",
        skills: ""
    })

    const changeHandler = e => {
        setData({...data,[e.target.name]:e.target.value});
    }
    
    const {name,surname,email, username,password, skills} = data;
    

 function login(){
    fetch('http://127.0.0.1:8000/auth/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(data=>data.json())
    .then(data=>{
        props.userLogin(data.token)
    
    })
    .catch(error=>console.error(error))
}

function register(){
   
    if(username === "" && name === "" && surname === "" &&
    email ==="" && username === "" && password === ""){
        alert("Обязательные поля не заполнены");
    }
    else{
    fetch('http://127.0.0.1:8000/api/users/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(data=>data.json())
    .then(data=>console.log(data))
    .catch(error=>console.error(error))

    handleLoginFormVisibility();
}
}

    // const result = selectedValues.map(item => {
    //     const dictItem = options.find(dictItem => dictItem.label === item);
    //     return dictItem ? dictItem.value : item;
    //   });
    //   console.log("result", result)

    // data.skills=result;

    // console.log(data)
    

function logout(){
    localStorage.removeItem('token');
    window.location.reload(true)
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



console.log(options)

    return(
        <div className='login-container'>
            {isDivVisible &&
            <div className='login-form'>
                <div className='info-box'>
             <label>
                Логин:
            </label> 
                <input type="text" name="username" value={username} onChange={changeHandler} />
                </div>

            <div className='info-box'>
             <label>
                Пароль:
            </label>
                <input type="password" name="password" value={password} onChange={changeHandler}/>
                </div>

             <button className='login-btn' onClick={login}>Войти</button>
             <div>Или</div>
             {/* <button onClick={logout}>Logout</button> */}
             <button  className='reg-btn' onClick={handleButtonClick}>Пройти регистрацию</button>
             </div>
             }



             {isVisible && 
             <div className='registration-form'>
            <div className='reg-title'>Регистрация</div>
                <div className='info-box'>
                    <label>
                        Имя: 
                    </label>
                        <input type="text" name="name" value={name} onChange={changeHandler} />
                    
                </div>
                <div className='info-box'>
                    <label>
                        Фамилия: 
                    </label>
                        <input type="text" name="surname" value={surname} onChange={changeHandler} />
                    
                </div>
                <div className='info-box'>
                    <label>
                        Адрес электронной почты: 
                    </label>
                        <input type="text" name="email" value={email} onChange={changeHandler} />
                    
                </div>
                <div className='info-box'>
                    <label>
                        Логин: 
                    </label>
                        <input type="text" name="username" value={username} onChange={changeHandler} />
                    
                </div>
                
                <div className='info-box'>
                <label>
                    Пароль:
                </label>
                    <input type="password" name="password" value={password} onChange={changeHandler}/>
                
                </div>
                <div className='info-box'>
                
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

                
                </div>
     
             <button onClick={register} className='reg-btn'>Зарегистрироваться</button>
             </div>
             }
        </div>
    )
}
export default Login




