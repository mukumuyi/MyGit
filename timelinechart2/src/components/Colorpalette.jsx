export default function colorPalette(props) {
    const r = 255 - parseInt(props.item.value.substr(1,2),16);
    const g = 255 - parseInt(props.item.value.substr(3,2),16);
    const b = 255 - parseInt(props.item.value.substr(5,2),16);

    return (
        <div>
          <input
            type="color"
            name="name"
            value={props.item.value}
            id={props.item.name}
            onChange={props.onChange}
          />
          <label htmlFor={props.item.name}
            style={{backgroundColor: props.item.value ,color: `rgb(${r}, ${g}, ${b})`}}>{props.item.label}</label>
        </div>
    );
}
