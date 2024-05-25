export default function BaseInput (props){
    const {type,name,item,onChange} =props
    return (
        <input
        type={type}
        name={name}
        value={item.value}
        id={item.name}
        onChange={onChange}
        style={{ width: "100%", height: "100%", opacity: "1" }}
      />

    )}