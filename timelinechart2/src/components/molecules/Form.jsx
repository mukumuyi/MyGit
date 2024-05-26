import FormRadioButton from "./FormRadioButton";
import FormSelect from "./FormSelect";

export default function Form(props) {
  return (
    <form className={props.type} onSubmit={props.onChange}>
      {props.type == "inline-radio" &&
        props.array.map((item) => {
          return (
            <FormRadioButton
              key={item.id}
              item={item}
              onChange={props.onChange}
              selected={props.selected}
            />
          );
        })}
      {props.type == "inline-text" && (
        <>
          <FormSelect
            value={props.value}
            selectItem={props.array}
            onChangeCol={(e) => {
              props.onSelect(e.target.value);
            }}
          />
          <input type="text" placeholder={props.placeHolder} />
        </>
      )}
    </form>
  );
}
