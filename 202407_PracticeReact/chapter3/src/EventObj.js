/**
 * @author Yutaka Nishimoto
 * @version 1.0.0 
 */

export default function EventObj() {
    const handleClick = e => console.log(e.button);
    return (
        <button onClick={handleClick}>クリック</button>
    );
}