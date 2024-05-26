export default function FormSelectOption(props) {
  const {item} = props;
    return (
    <option key={item.id} value={item.value}>
      {item.value}
    </option>
  );
}
