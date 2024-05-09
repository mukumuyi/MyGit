import React, { useState, useEffect } from "react";
import Card from "./Card";
import Contacts from "../contacts";
import Tooltip from "./Tooltip";

function Trial() {
  const [tasks, setTasks] = useState([]);

  const getIncompleteTasks = async () => {
    try {
      const params = {
        method: "post",
        headers: {
          "Content-Type": "application/json", // JSON形式のデータのヘッダー
        },
        body: JSON.stringify({
           sql: "SELECT id, name, color FROM public.users",
        }),
      };
      const response = await fetch("http://localhost:3000/api/task", params);
      const data = await response.json();
      console.log(data.rows)
      setTasks(data.rows);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  useEffect(() => {
    getIncompleteTasks();
  }, []);

  return (
    <>
      <h1>ここは試し用のページです</h1>
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
