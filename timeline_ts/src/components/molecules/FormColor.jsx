import FormColorPalette from "./FormColorPalette";

export default function FormColor(props) {
  const { array, onChange } = props;
  return (
    <form
      onSubmit={onChange}
      style={{
        display: "flex",
        borderRadius: "3px",
        border: "1px solid #b6b6b6",
      }}
    >
      {props.array.map((item) => {
        return (
          <FormColorPalette key={item.id} item={item} onChange={onChange} />
        );
      })}
    </form>
  );
}
