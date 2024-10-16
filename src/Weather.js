import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import { IoMdSearch } from "react-icons/io";
import Contextwetaher from './helpers/context'
import {currentDayName, formattedDate , nextThreeDays}from './components/dates'
import  {cloudy , semicloud , rainy , snowy , Stormy , Windy , Clear , Foggy , cloudicon , foggyicon , partlt_cloudicon , rainyicon,snowyicon , stormicon , windyicon , Clearicon , humidity , winds} from './helpers/images_icons'

const Weather = ({ unit, convertTemperature, onToggleUnit }) => {
   const [imageWetaher , setimageWetaher] = useState(cloudy)
   const [iconweather , seticonweather] = useState(foggyicon)
   const [SerachQuery , setSerachQuery] = useState('')
   const {datav1 ,  setcity ,forcastedata} = useContext(Contextwetaher)
   const [TypeWeather , setTypeWeather] = useState([]);
   const [dayweather ,setdayweather ] = useState([])
   
   useEffect(() => {
      switch (true) {
          case TypeWeather.includes('Clouds'):
              setimageWetaher(cloudy);
              seticonweather(cloudicon);
              break;
          case TypeWeather.includes('Clear'):
              setimageWetaher(Clear);
              seticonweather(Clearicon);
              break;
          case TypeWeather.includes('Fog'):
              setimageWetaher(Foggy);
              seticonweather(foggyicon);
              break;
          case TypeWeather.includes('Smoke'):
              setimageWetaher(semicloud);
              seticonweather(partlt_cloudicon);
              break;
          case TypeWeather.includes('Rain'):
              setimageWetaher(rainy);
              seticonweather(rainyicon);
              break;
          case TypeWeather.includes('Snow'):
              setimageWetaher(snowy);
              seticonweather(snowyicon);
              break;
          case TypeWeather.includes('Thunderstorm'):
              setimageWetaher(Stormy);
              seticonweather(stormicon);
              break;
          case TypeWeather.includes('Tornado'):
              setimageWetaher(Windy);
              seticonweather(windyicon);
              break;
          default:
              // Handle other cases or do nothing
              break;
      }
  }, [TypeWeather]);
  

   const findrighticon = (key) => {
      return(

         dayweather[key] === 'Clouds' ? cloudicon :
            dayweather[key] === 'Rain' ? rainyicon :
               dayweather[key] === 'Tornado' ? windyicon :
                  dayweather[key] === 'Clear' ? Clearicon :
                     dayweather[key] === 'Snow' ? snowyicon :
                        dayweather[key] === 'Fog' ? foggyicon :
                           dayweather[key] === 'Thunderstorm' ? stormicon :
                              dayweather[key] === 'Smoke' ? partlt_cloudicon :
                                 cloudicon
      )
   }

 

useEffect(() => {
   if (forcastedata) {
       const weatherArray = forcastedata.list.map((taaks) => taaks.weather);
       setdayweather(weatherArray.map((item)=>item[0].main).slice(0,4))
   }
}, [forcastedata]);

    const Hadnelsearch = ()=>{
      setcity(SerachQuery)
    }
    
    useEffect(()=>{
      setTypeWeather(datav1 ? datav1.weather.map((key)=>key.main) : '')
    },[datav1])
    
    const [unitwether , setunitweather] = useState(true)
  return (
   <div className='body' style={{backgroundImage:`url(${imageWetaher})`, backgroundSize:'cover' }}>
    <div className='container'>
        <div className='bg' style={{backgroundImage:`url(${imageWetaher})`,backgroundSize:'cover' }}>
         <div className='date'>
            <h1>{currentDayName}</h1>
            <p>{formattedDate}</p>
            
         </div>
         <div className='image'>
            <img src={iconweather} alt='weather - image '/>
            <h2>{datav1 
    ? unitwether 
      ? `${datav1.main.temp.toFixed(1)}°C` 
      : `${((datav1.main.temp * 9) / 5 + 32).toFixed(1)}°F`
    : ''
  }</h2>
            <h2>{datav1?datav1.name:''}</h2>
            
         </div>
         <div className='info'>
            <div className='infotext'><p>{datav1?datav1.main.humidity:''}% <br/>Humidity</p><img src={humidity} alt='weather - image '/></div>
            <div className='infotext'><p>{datav1?datav1.wind.speed:''}km/h<br/>Wind Speed </p><img src={winds} alt='weather - image '/></div>
            
         </div>
        </div>
        <div className='weather'>
            
            <div className='search'>
            <input type='text' placeholder='Serach By City...' onChange={(e)=>{setSerachQuery(e.target.value)}} required/>
            <div className='icon' onClick={Hadnelsearch}><IoMdSearch color='white' size={30}/></div>
            </div>
            <div className='dataweather'>
               <div className='singledata'>
                  <p>Humidity</p><p>{datav1?datav1.main.humidity:''}%</p>
               </div>
               <div className='singledata'>
                  <p>Winds</p><p>{datav1?datav1.wind.speed:''}km/h</p>
               </div>
               <div className='singledata'>
                  <p>Temperature</p><p>{datav1?datav1.main.temp:''}&deg;C</p>
               </div>
               <div className='singledata'>
                  <p>Pressure</p><p>{datav1?datav1.main.pressure:''}Pa</p>
               </div>
               <button onClick={()=>setunitweather(!unitwether)} id='F'>{unitwether?'F':`°C`}</button>
            </div>
            <div className='forcaste'>
            
              {forcastedata ? forcastedata.list.slice(1, 5).map((weather, key) => (
                 <div className='days' key={key}>
                  <img className='dayicon' src={findrighticon(key)} alt='weather - image ' />
                  <div className='date'>
                  {nextThreeDays[key].slice(0,3)}
                  </div>
                    {weather.main.temp}°C
                    
                 </div>
              )) : 'null'}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Weather