import { useEffect, useRef } from 'react';
import './EventPassive.css';

export default function EventPassive () {
    const handleWheel = e => e.preventDefault();
    const divRef = useRef(null);
    useEffect(()=>{
        const div = divRef.current;
        div.addEventListener('wheel',handleWheel,{passive:false});
        return (() => {
            div.removeEventListener('wheel',handleWheel);
        })
    })
    return (
        <div ref={divRef} className="box"
        onWheel={handleWheel}>
            例えばWheelイベントをハンドラーで...
        </div>
    )
}