export default function FormSelectOption(props) {
  return (
    <option key={props.item.id} value={props.item.value}>
      {props.item.value}
    </option>
  );
}
