import React, { useState } from "react";
import { FaPlay, FaRegWindowClose } from "react-icons/fa";

import { HeaderFromDB } from "../module/DataInput";
import { url, SqlDef } from "../Config";

const InputDB = (props) => {
  const { onCloseClick, setColSelector, setInputData, setOriginData } = props;

  const [sql, setSql] = useState(SqlDef);

  // textareaの値が変更されたときに実行される関数
  const handleTextareaChange = (event) => {
    setSql(event.target.value);
  };

  const executeQuery = async () => {
    try {
      const params = {
        method: "post",
        headers: {
          "Content-Type": "application/json", // JSON形式のデータのヘッダー
        },
        body: JSON.stringify({
          // 基本的にはDBの切り替えはサーバー側の処理で行う。
          // host: "localhost",
          // user: "postgres",
          // database: "world",
          // password: "XXXX",
          // port: "5432",
          sql: sql,
        }),
      };
      const response = await fetch(url.db, params);
      const data = await response.json();
      HeaderFromDB(data.rows, setColSelector, setInputData, setOriginData);
    } catch (error) {
      console.error("エラー:", error);
      alert("データ取得エラーが発生しました。\n" + error);
    }
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5pt",
        }}
      >
        <div style={{ display: "inline-flex", gap: "5pt", margin: "10pt" }}>
          <FaPlay size="15pt" onClick={executeQuery} />
          <FaRegWindowClose
            size="15pt"
            onClick={() => {
              onCloseClick("Import");
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

export default InputDB;
