import {useState} from 'react';

export default function EventOnce () {
    const [clicked,setClicked] = useState(false);
    const [result,setResult] = useState(false);
    const handleClick = e => {
        if(!clicked){
            setResult(Math.floor(Math.random()*100+1));
            setClicked(true);
        }
    }
    return (
        <>
        <button onClick={handleClick}>結果表示</button>
        <p>今日の運勢は{result}点です。</p>
        </>
    )
}