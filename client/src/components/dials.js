import { useRef, useState, useEffect } from 'react'; // Import necessary React hooks
import vol from '../assets/volume.png'; // Import volume icon image
import Arrows from './arrow'; // Import the Arrows component

const Dials = ({ socket }) => {
  // Ref to access the volume input element directly
  const volume = useRef(null);
  // State to keep track of the current volume level
  const [volumeText, setVolumeText] = useState(50);

  // Function to handle volume changes
  const changeVol = (newValue) => {
    setVolumeText(newValue); // Update the state with the new volume value
    socket.emit('volume', newValue); // Emit the new volume value via the socket
  };

  // Function to handle touch movements on the volume slider
  const handleTouchMove = (event, sliderRef, changeFunction) => {
    event.preventDefault(); // Prevent default touch behavior to avoid unwanted scrolling
    const touch = event.touches[0]; // Get the first touch point
    const slider = sliderRef.current; // Access the slider element via ref
    const rect = slider.getBoundingClientRect(); // Get the slider's position and size
    const percentage = ((rect.bottom - touch.clientY) / rect.height) * 100; // Calculate the touch position as a percentage
    const newValue = Math.round(Math.min(100, Math.max(0, percentage)), 1); // Clamp the value between 0 and 100, and round to the nearest integer
    slider.value = newValue; // Update the slider value
    changeFunction(newValue); // Call the change function with the new value
  };

  // Effect to handle preventing default touch behavior globally
  useEffect(() => {
    const preventDefaultTouch = (e) => {
      e.preventDefault(); // Prevent default touch behavior on touchmove
    };
    document.addEventListener('touchmove', preventDefaultTouch, { passive: false }); // Add event listener for touchmove
    return () => {
      document.removeEventListener('touchmove', preventDefaultTouch); // Clean up event listener on component unmount
    };
  }, []);

  // Inline style for the volume slider
  const sliderStyle = {
    WebkitAppearance: 'slider-vertical', // Make the slider vertical on WebKit browsers
    writingMode: 'bt-lr', // Set writing mode to bottom-to-top and left-to-right
    padding: '0 5px', // Add padding on the sides
  };

  return (
    <div className="w-full h-[60%] flex"> {/* Container for the dials */}
      <div className="h-[100%] w-[20%] justify-center w-[50%]"> {/* Container for the volume control */}
        <div className='flex justify-center py-5 w-[100%]'>
          <img className='w-10 animate-pulse' src={vol} alt="Volume" /> {/* Volume icon */}
        </div>
        <div className='flex justify-center h-[70%]'>
          <input
            ref={volume} // Reference to the slider element
            onInput={(e) => changeVol(e.target.value)} // Handle input changes from the slider
            onTouchMove={(e) => handleTouchMove(e, volume, changeVol)} // Handle touch move events
            onTouchStart={(e) => e.preventDefault()} // Prevent default behavior on touch start
            className="w-2 h-full rounded-xl" // Tailwind CSS classes for styling the slider
            type="range" // Slider type
            min="0" // Minimum value for the slider
            max="100" // Maximum value for the slider
            value={volumeText} // Current value of the slider
            style={sliderStyle} // Apply inline styles
          />
        </div>
        <div className='flex justify-center'>
          <p>{volumeText}</p> {/* Display the current volume value */}
        </div>
      </div>
      <div className="h-[100%] w-[80%] justify-center w-[50%] items-center"> {/* Container for the Arrows component */}
        <Arrows socket={socket}/> {/* Render the Arrows component */}
      </div>
    </div>
  );
};

export default Dials; // Export the Dials component
