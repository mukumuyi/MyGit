import {useState} from 'react';

/**
 * @param {string} beforeSrc 元画像 
 * @param {string} afterSrc 次画像
 * @param {string} alt 
 * @author Yutaka Nishimoto
 * @version 1.0.0 
 */


export default function EventMouse ({beforeSrc,afterSrc,alt}) {
    const [current,setCurrent]  = useState(beforeSrc);
    const handleEnter = () => setCurrent(afterSrc);
    const handleLeave = () => setCurrent(beforeSrc);
    return (
        <img src={current} alt={alt}
        onMouseEnter={handleEnter} onMouseLeave={handleLeave} />
    );

}