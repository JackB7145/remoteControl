import { useRef, useState, useEffect } from 'react'
import bright from '../assets/bright.png'
import vol from '../assets/volume.png'

const Dials = ({socket}) => {
  const volume = useRef(null)
  const brightness = useRef(null)
  const [brightText, setBrightText] = useState(50)
  const [volumeText, setVolumeText] = useState(50)

  const changeVol = (newValue) => {
    setVolumeText(newValue)
    socket.emit('volume', newValue)
  }

  const changeBrightness = (newValue) => {
    setBrightText(newValue)
    socket.emit('brightness', newValue)
  }

  const handleTouchMove = (event, sliderRef, changeFunction) => {
    event.preventDefault()
    const touch = event.touches[0]
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    const percentage = ((rect.bottom - touch.clientY) / rect.height) * 100
    const newValue = Math.round(Math.min(100, Math.max(0, percentage)), 1)
    slider.value = newValue
    changeFunction(newValue)
  }

  useEffect(() => {
    const preventDefaultTouch = (e) => {
      e.preventDefault()
    }
    document.addEventListener('touchmove', preventDefaultTouch, { passive: false })
    return () => {
      document.removeEventListener('touchmove', preventDefaultTouch)
    }
  }, [])

  const sliderStyle = {
    WebkitAppearance: 'slider-vertical',
    writingMode: 'bt-lr',
    padding: '0 5px',
  }

  return(
    <div className="w-full h-[60%] flex">
      <div className="h-[100%] w-1/2 justify-center w-[50%]">
        <div className='flex justify-center py-5 w-[100%]'>
          <img className='w-10 animate-pulse' src={bright} alt="Brightness" />
        </div>
        <div className='flex justify-center h-[70%]'>
          <input
            ref={brightness}
            onInput={(e) => changeBrightness(e.target.value)}
            onTouchMove={(e) => handleTouchMove(e, brightness, changeBrightness)}
            onTouchStart={(e) => e.preventDefault()}
            className="bg-[#D9D9D9] w-2 h-full rounded-xl"
            type="range"
            min="0"
            max="100"
            value={brightText}
            style={sliderStyle}
          />
        </div>
        <div className='flex justify-center'>
          <p>{brightText}</p>
        </div>
      </div>
      <div className="h-[100%] w-1/2 justify-center w-[50%]">
        <div className='flex justify-center py-5 w-[100%]'>
          <img className='w-10 animate-pulse' src={vol} alt="Volume" />
        </div>
        <div className='flex justify-center h-[70%]'>
          <input
            ref={volume}
            onInput={(e) => changeVol(e.target.value)}
            onTouchMove={(e) => handleTouchMove(e, volume, changeVol)}
            onTouchStart={(e) => e.preventDefault()}
            className="bg-[#D9D9D9] w-2 h-full rounded-xl"
            type="range"
            min="0"
            max="100"
            value={volumeText}
            style={sliderStyle}
          />
        </div>
        <div className='flex justify-center'>
          <p>{volumeText}</p>
        </div>
      </div>
    </div>
  )
}

export default Dials;