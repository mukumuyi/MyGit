import { FaPlay, FaRegWindowClose } from "react-icons/fa";

const ImputDB = (props) => {
  const { onDbClick, onCloseClick, sql, handleTextareaChange } = props;
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5pt",
        }}
      >
        <div style={{ display: "inline-flex", gap: "5pt"  ,margin:"10pt"}}>
          <FaPlay size="20pt" onClick={onDbClick} />
          <FaRegWindowClose
            size="20pt"
            onClick={() => {
              onCloseClick("LOCAL");
            }}
          />
        </div>
        <textarea
          name="sql"
          id="sqledit"
          cols="30"
          rows="10"
          placeholder="Please enter SQL & click DB icon"
          value={sql} // textareaの値をstateと紐付ける
          onChange={handleTextareaChange} // textareaの値が変更されたときに呼び出される関数を指定
          style={{
            margin: "5pt",
          }}
        ></textarea>
      </form>
    </div>
  );
};

export default ImputDB;
