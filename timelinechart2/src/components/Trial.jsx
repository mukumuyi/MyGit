import React, { useState, useEffect } from "react";
import Card from "./Card";
import Contacts from "../contacts";
import Tooltip from "./Tooltip";
import Button from '@mui/material/Button';


function Trial() {
  const [sql,setSql] = useState("SELECT id, name FROM public.users")
  const [tasks, setTasks] = useState([]);

  const getIncompleteTasks = async () => {
    try {
      const params = {
        method: "post",
        headers: {
          "Content-Type": "application/json", // JSON形式のデータのヘッダー
        },
        body: JSON.stringify({
          sql: sql,
        }),
      };
      const response = await fetch("http://localhost:3000/api/task", params);
      const data = await response.json();
      console.log(data.rows);
      setTasks(data.rows);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  useEffect(() => {
    getIncompleteTasks();
  }, [sql]);

  const onExecClick = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setSql(e.target[0].value)
  };

  return (
    <>
      <h1>ここは試し用のページです</h1>
      <form onSubmit={onExecClick}>
        <textarea name="sql" id="sqledit" cols="30" rows="10"></textarea>
        <button>Execute</button>
      </form>

      <Button variant="contained">Hello world</Button>
      <p>SQL結果は以下に</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} (色: {task.color})
          </li>
        ))}
      </ul>
      <br />
    </>
  );
}

export default Trial;
