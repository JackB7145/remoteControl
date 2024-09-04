import React, { useState, useEffect } from 'react';
import left from '../assets/arrow_left.png';   // Import the left arrow image
import right from '../assets/arrow_right.png'; // Import the right arrow image
import up from '../assets/arrow_up.png';       // Import the up arrow image
import down from '../assets/arrow_down.png';   // Import the down arrow image
import clickMe from '../assets/click.png';     // Import the click image
import './styles.css';                       // Import the CSS styles

const Arrows = ({ socket }) => {
    // State to keep track of the interval ID for controlling the direction
    const [intervalId, setIntervalId] = useState(null);
    // State to store the current direction or action
    const [direction, setDirection] = useState(null);

    // Effect to handle the interval based on the current direction
    useEffect(() => {
        if (direction) {
            // Start an interval to emit the direction every 5ms
            const id = setInterval(() => {
                if (direction !== 'click') {
                    // Emit the direction through the socket
                    socket.emit('mouseControl', direction);
                }
            }, 5); // Adjust the interval time as needed

            // Store the interval ID in state
            setIntervalId(id);

            // Cleanup function to clear the interval when direction changes or component unmounts
            return () => clearInterval(id);
        }
    }, [direction]); // Re-run the effect whenever the direction changes

    // Function to handle touch start event, setting the direction
    const handleTouchStart = (dir) => {
        setDirection(dir);
    };

    // Function to handle touch end event, stopping the interval
    const handleTouchEnd = () => {
        setDirection(null); // Reset direction to null
        if (intervalId) {
            clearInterval(intervalId); // Clear the interval
        }
    };

    // Inline style to prevent text selection
    const noSelectStyle = {
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        userSelect: 'none',
    };

    return (
        <div className="w-[100%] h-full flex flex-row">
            {/* Left arrow button */}
            <div className="h-full w-1/3 flex items-center justify-end">
                <button
                    className="rounded-full bg-[#4d68f6] hover:bg-[#3b58ed]"
                    onTouchStart={() => handleTouchStart('left')}
                    onTouchEnd={handleTouchEnd}
                >
                    <img
                        src={left}
                        className="w-20 h-20 p-2 select-none"
                        alt="left arrow"
                        style={noSelectStyle}
                    />
                </button>
            </div>
            {/* Center buttons for up, click, and down actions */}
            <div className="h-full w-1/3 flex flex-col justify-center">
                <button
                    className="rounded-full w-20 mx-auto bg-[#4d68f6] hover:bg-[#3b58ed]"
                    onTouchStart={() => handleTouchStart('up')}
                    onTouchEnd={handleTouchEnd}
                >
                    <img
                        src={up}
                        className="w-20 h-20 p-2 select-none"
                        alt="up arrow"
                        style={noSelectStyle}
                    />
                </button>
                <button
                    className="rounded-full w-20 mx-auto my-4 bg-[#4d68f6] hover:bg-[#3b58ed]"
                    onTouchStart={() => socket.emit('mouseControl', 'click')}
                    onTouchEnd={handleTouchEnd}
                >
                    <img
                        src={clickMe}
                        className="w-20 h-20 p-2 select-none"
                        alt="click me"
                        style={noSelectStyle}
                    />
                </button>
                <button
                    className="rounded-full w-20 mx-auto bg-[#4d68f6] hover:bg-[#3b58ed]"
                    onTouchStart={() => handleTouchStart('down')}
                    onTouchEnd={handleTouchEnd}
                >
                    <img
                        src={down}
                        className="w-20 h-20 p-2 select-none"
                        alt="down arrow"
                        style={noSelectStyle}
                    />
                </button>
            </div>
            {/* Right arrow button */}
            <div className="h-full w-1/3 flex items-center">
                <button
                    className="rounded-full bg-[#4d68f6] hover:bg-[#3b58ed]"
                    onTouchStart={() => handleTouchStart('right')}
                    onTouchEnd={handleTouchEnd}
                >
                    <img
                        src={right}
                        className="w-20 h-20 p-2 select-none"
                        alt="right arrow"
                        style={noSelectStyle}
                    />
                </button>
            </div>
        </div>
    );
};

export default Arrows;
