import React, { useState, useEffect } from 'react';
interface IMouseTracker {

}
const MouseTracker: React.FC<IMouseTracker> = (props) => {
    const [position, setPosition] = useState({x: 0, y: 0});
    useEffect(() => {
        document.addEventListener('mousemove', (e: MouseEvent) => {
            setPosition({x: e.clientX, y: e.clientY});
        });
    }, []);
    
    return (
        <p>{`(${position.x}, ${position.y})`}</p>
    );
};


export default MouseTracker;