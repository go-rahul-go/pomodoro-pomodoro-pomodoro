import { useEffect, useState } from 'react'
import { FaRegPauseCircle, FaRegPlayCircle } from 'react-icons/fa';
import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import alarm from "./assets/mixkit-alarm-tone-996.wav"
function App() {

  const [breakTime, changeBreakTime] = useState(5);
  const [sessionTime, changeSessionTime] = useState(25);
  const [displayTime, changeDisplayTime] = useState(25 * 60)
  const [timerStatus, changeTimerStatus] = useState(false);
  const [timerName, changeTimerName] = useState("session time")

  const handleBreak = (type) => {
    if (type === "-") {
      if (breakTime > 1) {
        changeBreakTime(breakTime - 1);
      }

    }
    else {
      if (breakTime <=59) {
        changeBreakTime(breakTime + 1)
      }
    }
  }

  const handleSession = (type) => {
    if (type === "-") {
      if (sessionTime > 1) {
        changeSessionTime(sessionTime - 1);
        changeDisplayTime((sessionTime - 1) * 60)
      }

    }
    else {
      if (sessionTime <=59) {
        changeSessionTime(sessionTime + 1)
        changeDisplayTime((sessionTime + 1) * 60)
      }
    }
  }
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    )
  }

  async function playAudio(){
    let audio=new Audio(alarm);
    await audio.play();
  }
  const startTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let c=0;
    
    console.log(date)
    console.log(nextDate)
    changeTimerStatus(true)
    
    let timer = setInterval(() => {
      date = new Date().getTime();

      if (date > nextDate) {

        changeDisplayTime((prev) => {
          if (prev === 0 ) {
           
            if(c===0)
            {
              changeTimerName("break time");
              changeDisplayTime(breakTime * 60);
              console.log("break time")
              playAudio();
              
            }
            else if(c===1){
              changeTimerName("session time")
              
              changeDisplayTime(sessionTime * 60)
              console.log("session time") 
              playAudio();
              
              c=0;
            }
            c++;
           
          }
          console.log(c)
          
          return prev - 1;
        })

      }

    }, 1000)

    localStorage.clear();
    localStorage.setItem("timer", timer)
  }

  const pauseTime = () => {
    let t = localStorage.getItem("timer");
    clearInterval(t)
    // console.log(t)
    changeTimerStatus(false)
  }

  function resetTime(){
    changeDisplayTime(25 * 60)
    changeSessionTime(25)
    changeBreakTime(5)
    changeTimerName("session time")
    let t = localStorage.getItem("timer");
    clearInterval(t)
    changeTimerStatus(false)

  }
  return (
    <>
      <h1 className='text-gray-200 font-semibold text-left text-2xl lg:text-3xl py-2 border-gray-700 border-b px-5'>25+5</h1>
      <div className='controls '>
        <div className='break lg:[w-35%]' id="break-label">
          <p className=' text-xl lg:text-3xl'>Break Length</p>
          <div className='time-control'>
            <button className='btn' onClick={() => handleBreak("-")} disabled={timerStatus} id="break-decrement">-</button>
            <span className='text-4xl' id="break-length">{breakTime}</span>
            <button className='btn' onClick={() => handleBreak("+")} disabled={timerStatus} id="break-increment">+</button>
          </div>
        </div>
        <div className='session lg:[w-25%]' id="session-label">
          <p className=' text-xl lg:text-3xl'>Session Length</p>
          <div className='time-control'>
            <button className='btn' onClick={() => handleSession("-")} disabled={timerStatus} id="session-decrement">-</button>
            <span className='text-4xl' id="session-length">{sessionTime}</span>
            <button className='btn' onClick={() => handleSession("+")} disabled={timerStatus} id="session-increment">+</button>
          </div>
        </div>
      </div>
      <div className='display-box lg:w-[50%] lg:h-[300px]'>
        <p className='text-2xl lg:text-3xl uppercase' id="timer-label">{timerName}</p>
        <p className='font-bold text-orange-500 text-6xl lg:text-5xl' id="time-left">{formatTime(displayTime)}</p>
        <div className='display-controls flex justify-center items-center gap-2 '>
          <div id="start_stop">
          {
            timerStatus?<FaRegCirclePause className='text-5xl lg:text-4xl' onClick={pauseTime} />:<FaRegCirclePlay className='text-5xl lg:text-4xl' onClick={startTime}/>
          }
          </div>
          
          <VscDebugRestart className='text-5xl lg:text-4xl' onClick={resetTime} id="reset"/>
        </div>
      </div>
    </>
  )


}

export default App
