import Radiobutton from "./Radiobutton";
import Colorpalette from "./Colorpalette";

export default function Form(props) {
  return (
    <form className={props.type} onSubmit={props.onChange}>{props.label}
      {props.type == "inline-radio" && (
        props.array.map((item) => {
          return (
            <Radiobutton
              key={item.id}
              item={item}
              onChange={props.onChange}
              selected={props.selected}
            />
          );
        })
      )}
      {props.type == "inline-color" &&
        props.array.map((item) => {
          return (
            <Colorpalette key={item.id} item={item} onChange={props.onChange} />
          );
        })}
      {props.type == "inline-text" && (
        <>
          <select>
            {props.array.map((item) => {
              return (
                <option key={item.id} value={item.value}>
                  {item.value}
                </option>
              );
            })}
          </select>
          <input type="text" placeholder={props.placeHolder} />
        </>
      )}
    </form>
  );
}
