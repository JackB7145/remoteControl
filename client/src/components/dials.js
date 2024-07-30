import {useRef, useEffect} from 'react'
import bright from '../assets/bright.png'
import vol from '../assets/volume.png'
const Dials = () =>{
const volume = useRef(null)
const brightness = useRef(null)

const changeVol = () => {
    console.log(volume.current.value)
}
const changeBrightness = () => {
    console.log(brightness.current.value)
}
return(
    <div className="w-full h-[60%] flex">

        <div className="h-[100%] w-1/2 justify-center w-[50%]">
            <div className='flex justify-center py-5 w-[100%]'>
                <img className='w-10 animate-pulse' src={bright}></img>
            </div>
            <div className='flex justify-center h-[70%]'>
                <input ref={brightness} onChange={()=>{changeBrightness()}} className="appearance-none bg-[#D9D9D9] w-2 rounded-xl" orient="vertical" type="range" min="0" max="100"></input>
            </div>
        </div>
        <div className="h-[100%] w-1/2 justify-center w-[50%]">
            <div className='flex justify-center py-5 w-[100%]'>
                <img className='w-10 animate-pulse' src={vol}></img>
            </div>
            <div className='flex justify-center h-[70%]'>
                <input ref={volume} onChange={()=>{changeVol()}} className="appearance-none bg-[#D9D9D9] w-2 rounded-xl" orient="vertical" type="range" min="0" max="100"></input>
            </div>
        </div>

    </div>

)
}
export default Dials;