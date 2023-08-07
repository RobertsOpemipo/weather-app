import logo from './logo.svg';
import './App.css';
import './index.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {IoMdSunny, IoMdRainy, IoMdCloudy,IoMdSnow,IoMdThunderstorm, IoMdSearch} from 'react-icons/io';

import {BsCloudHaze2Fill, BSCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind, BsCloudDrizzleFill} from 'react-icons/bs';

import {TbTemperatureCelsius} from 'react-icons/tb';
import {ImSpinner8} from 'react-icons/im';

// 576267ec4f460f4b1e6a0e20bb843039

const APIkey = '576267ec4f460f4b1e6a0e20bb843039';


const App = () => {
  const [data,setData] = useState(null);
  const [location, setLocation] = useState('Bucharest');

  useEffect(()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  // console.log(data);

  // if data is false show loader
  if(!data){
    return(
      <div>
        <div>
          <ImSpinner8 className='text-5xl animate-spin'/>
        </div>
      </div>
    )
  }


  // set icon sccording to weather
  let icon;


  switch(data.weather[0].main) {

    case 'Clouds':
      icon = <IoMdCloudy/>;

      break;

    case 'Haze':
      icon = <BsCloudHaze2Fill/>;

      break;

    case 'Rain':
      icon = <IoMdRainy/>;

      break;

    case 'Clear':
      icon = <IoMdSunny/>;

      break;

    case 'Drizzle':
      icon = <BsCloudDrizzleFill/>;

      break;

    case 'Snow':
      icon = <IoMdSnow/>;

      break;

    case 'Thunderstorm':
      icon = <IoMdThunderstorm/>;

      break;

  }

const date = new Date();
  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
        {/* form */}
        <form className='h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-3'>
          <div className='h-full relative flex items-center justify-between p-2'>
            <input className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' type='text' placeholder='Search by city or country'/>
            <button className='bg-[#1ab8ed] w-20 h-12 rounded-full flex justify-center items-center transition'>
              <IoMdSearch />
            </button>
          </div>
        </form>
          {/* card */}
            <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-10 px-6'>
              <div>
                {/* card top */}
                <div className=' flex item-center gap-x-5'>
                  {/* icon */}
                  <div className='text-[87px]'>{icon}</div>
                  <div>
                  {/* country name */}
                  <div className='text-2xl font-semibold'>  
                    {data.name}, {data.sys.country}
                  </div>

                  {/* date */}
                  <div>
                    {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                  </div>
                  </div>
                </div>
                {/* card body */}
                <div className='my-20'>
                    <div className='flex justify-center items-center'>
                      {/* temp */}
                      <div className='text-[144px] leading-none font-light'>
                        {parseInt(data.main.temp)}
                      </div>
                      {/* celsius icon */}
                      <div className='text-4xl'>
                        <TbTemperatureCelsius/>
                      </div>
                    </div>
                    {/* weather description */}
                    <div className='capitalize text-center'>{data.weather[0].description}</div>
                </div>

                {/* card bottom */}
                <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-x-2'>
                        {/* icon */}
                        <div className='text-[20px]'>
                          <BsEye />
                        </div>

                        <div>
                          Visibility{''} <span className='ml-2'>{data.visibility/1000}km </span>
                        </div>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        {/* icon */}
                        <div className='text-[20px]'>
                          <BsThermometer />
                        </div>

                        <div className='flex'>
                          Feels like <div className='flex ml-2'>{parseInt(data.main.feels_like)}
                          
                          <TbTemperatureCelsius/></div>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-x-2'>
                        {/* icon */}
                        <div className='text-[20px]'>
                          <BsWater />
                        </div>

                        <div>
                          Humidity <span className='ml-2'>{data.main.humidity}% </span>
                        </div>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        {/* icon */}
                        <div className='text-[20px]'>
                          <BsWind />
                        </div>

                        <div>
                          Wind<span className='ml-2'>{data.wind.speed} m/s</span>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        
    </div>
  );
};

export default App;
