import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'
import Weather from './Weather'
import Contextwetaher from './helpers/context'

const App = () => {
  const [datav1 , setdatav1]= useState()
  const [forcastedata , setforcastedata] = useState()
  const oldcity ='london'
  const [city, setcity] = useState(oldcity) 
  const [degree , setdegree] = useState('units=metric')

  const [errorMessage, setErrorMessage] = useState('');
 
  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${degree}&appid=1ccd3f08a277fcfbe2eb2dbc4a0b276f`
  const urlforcaste = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=023d4d63aa6afb0c765dd9bc0e728ff5`
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setdatav1(response.data);
            setErrorMessage('')
        } catch (error) {
            // Check if the error is due to an invalid city name
            if (error.response && error.response.status === 404) {
              setErrorMessage('The city name is incorrect. Please enter a valid city name.');
            alert(errorMessage)
               
            } else {
              setErrorMessage('An error occurred while fetching the data.');
            }
        }
    };

    fetchData();
}, [city ,errorMessage , url]);

  useEffect(()=>{
    axios.get(urlforcaste).then(data=>setforcastedata(data.data))
    .catch(error => {
      if (error.response && error.response.status === 404) {
        setErrorMessage('The city name is incorrect. Please enter a valid city name.');
      } else {
        setErrorMessage('An error occurred while fetching forecast data.');
      }
    });
    
  },[city ,errorMessage, urlforcaste])
  
  return (
    <div className='App'>
      <Contextwetaher.Provider value={ {errorMessage, datav1,forcastedata , city ,setcity ,setdegree, degree}}>
        <Weather />
      </Contextwetaher.Provider>
      
    </div>
  )
}

export default App