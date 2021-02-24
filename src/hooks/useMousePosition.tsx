import { useEffect, useState } from "react";

const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        document.addEventListener('mousemove', (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        });
    }, []);
    return [position, setPosition];
}

export default useMousePosition;