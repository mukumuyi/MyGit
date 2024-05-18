import {FaDatabase} from "react-icons/fa";

const ImputDB = (props) => {
    const {onDbClick,sql,handleTextareaChange} = props
  return (
    <div>
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "5pt",
      }}
    >
      <FaDatabase size="30pt" onClick={onDbClick} />
      <textarea
        name="sql"
        id="sqledit"
        cols="30"
        rows="10"
        placeholder="Please enter SQL & click DB icon"
        value={sql} // textareaの値をstateと紐付ける
        onChange={handleTextareaChange} // textareaの値が変更されたときに呼び出される関数を指定
        style={{
          // width: "200pt",
          margin: "5pt",
        }}
      ></textarea>
    </form>
  </div>
  )
}

export default ImputDB